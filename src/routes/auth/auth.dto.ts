import { IsString } from 'class-validator'

export class LoginBodyDTO {
  //   @IsString({ message: 'Tên phải là chuỗi' }) //Customize message
  @IsString()
  email: string
  @IsString()
  password: string
}

export class RegisterBodyDTO extends LoginBodyDTO {
  @IsString()
  name: string
  @IsString()
  confirmPassword: string
}
