import { ConflictException, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { LoginBodyDTO } from 'src/routes/auth/auth.dto'
import { HashingService } from 'src/shared/services/hashing.service'
import { PrismaService } from 'src/shared/services/prisma.service'
import { TokenService } from 'src/shared/services/token.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
  ) {}
  async register(body: any) {
    try {
      const hashedPassword = await this.hashingService.hash(body.password)
      const user = await this.prismaService.user.create({
        data: {
          email: body.email,
          name: body.name,
          password: hashedPassword,
        },
      })
      return user
    } catch (error) {
      // console.log(error)
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Email already exists')
      }
      throw error
    }
  }
  async login(body: LoginBodyDTO) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: body.email,
      },
    })
    if (!user) {
      throw new UnauthorizedException('User not found')
    }
    const isPasswordMatch = await this.hashingService.compare(body.password, user.password)
    if (!isPasswordMatch) {
      throw new UnprocessableEntityException([
        {
          field: 'password',
          error: 'Password is incorrect',
        },
      ])
    }
    const tokens = await this.generateTokens({ userId: user.id })
    return tokens
  }
  async generateTokens(payload: { userId: number }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.signAccessToken(payload),
      this.tokenService.signRefreshToken(payload),
    ])
    const decodedRefreshToken = await this.tokenService.verifyRefreshToken(refreshToken)
    await this.prismaService.refreshToken.create({
      data: {
        userId: payload.userId,
        token: refreshToken,
        expiresAt: new Date(decodedRefreshToken.exp * 1000),
      },
    })
    return {
      accessToken,
      refreshToken,
    }
  }
  async refreshToken(refreshToken: string) {
    //1. Kiểm tra refresh token có hợp lệ không
    try {
      const { userId } = await this.tokenService.verifyRefreshToken(refreshToken)
      //2. Kiem tra refresh token trong database
      await this.prismaService.refreshToken.findUniqueOrThrow({
        where: {
          token: refreshToken,
        },
      })
      //3. Xoá refresh token trong database
      await this.prismaService.refreshToken.delete({
        where: {
          token: refreshToken,
        },
      })
      //4. Tạo token moi
      return await this.generateTokens({ userId })
    } catch (error) {
      //Trường hợp đã refresh token rồi, hãy thông báo cho user biết
      //refresh token của họ đã bị đánh cắp
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new UnauthorizedException('Refresh token has been revoked')
      }
      throw new UnauthorizedException()
    }
  }
}
