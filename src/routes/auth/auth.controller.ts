import { Body, ClassSerializerInterceptor, Controller, Post, SerializeOptions, UseInterceptors } from '@nestjs/common'
import { RegisterBodyDTO, RegisterResDTO } from 'src/routes/auth/auth.dto'
import { AuthService } from 'src/routes/auth/auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // @UseInterceptors(ClassSerializerInterceptor) //Không cần nữa vì đã áp dụng interceptor cho global rồi
  @SerializeOptions({ type: RegisterResDTO })
  @Post('register')
  register(@Body() body: RegisterBodyDTO) {
    return this.authService.register(body)
  }
}
