import { Body, Controller, HttpCode, HttpStatus, Post, SerializeOptions, UseGuards } from '@nestjs/common'
import {
  LoginBodyDTO,
  LoginResDTO,
  RefreshTokenBodyDTO,
  RefreshTokenResDTO,
  RegisterBodyDTO,
  RegisterResDTO,
} from 'src/routes/auth/auth.dto'
import { AuthService } from 'src/routes/auth/auth.service'
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // @UseInterceptors(ClassSerializerInterceptor) //Không cần nữa vì đã áp dụng interceptor cho global rồi
  @SerializeOptions({ type: RegisterResDTO })
  @Post('register')
  async register(@Body() body: RegisterBodyDTO) {
    // console.log(`Registering...`)
    // return new RegisterResDTO(await this.authService.register(body))
    return await this.authService.register(body)
  }

  @Post('login')
  async login(@Body() body: LoginBodyDTO) {
    return new LoginResDTO(await this.authService.login(body))
  }
  @UseGuards(AccessTokenGuard)
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() body: RefreshTokenBodyDTO) {
    console.log(123)
    return new RefreshTokenResDTO(await this.authService.refreshToken(body.refreshToken))
  }
}
