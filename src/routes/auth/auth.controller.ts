import { Body, Controller, HttpCode, HttpStatus, Post, SerializeOptions } from '@nestjs/common'
import {
  LoginBodyDTO,
  LoginResDTO,
  RefreshTokenBodyDTO,
  RefreshTokenResDTO,
  RegisterBodyDTO,
  RegisterResDTO,
} from 'src/routes/auth/auth.dto'
import { AuthService } from 'src/routes/auth/auth.service'

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

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() body: RefreshTokenBodyDTO) {
    return new RefreshTokenResDTO(await this.authService.refreshToken(body.refreshToken))
  }
}
