import { Body, Controller, Post, SerializeOptions } from '@nestjs/common'
import { LoginBodyDTO, LoginResDTO, RegisterBodyDTO, RegisterResDTO } from 'src/routes/auth/auth.dto'
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
}
