import { Exclude, Type } from 'class-transformer'
import { IsString, Length } from 'class-validator'
import { Match } from 'src/shared/decorators/custom-validator.decorator'
import { SuccessResDTO } from 'src/shared/shared.dto'

export class LoginBodyDTO {
  //   @IsString({ message: 'Tên phải là chuỗi' }) //Customize message
  @IsString()
  email: string
  @IsString()
  @Length(6, 20, { message: 'Password must be at least 6 characters and less than 20 characters' })
  password: string
}

export class RegisterBodyDTO extends LoginBodyDTO {
  @IsString()
  name: string
  @IsString()
  @Match('password')
  // @Match('password', { message: 'Confirm password does not match with password' })
  confirmPassword: string
}

class RegisterData {
  id: number
  email: string
  name: string
  @Exclude() password: string
  createdAt: Date
  updatedAt: Date
  //Option thêm
  // @Expose()
  // get emailName() {
  //   return `${this.email} - ${this.name}`
  // }
  constructor(partial: Partial<RegisterData>) {
    Object.assign(this, partial)
  }
}

export class RegisterResDTO extends SuccessResDTO {
  @Type(() => RegisterData)
  data: RegisterData
  constructor(partial: Partial<RegisterResDTO>) {
    super(partial)
    Object.assign(this, partial)
  }
}

export class LoginResDTO {
  accessToken: string
  refreshToken: string
  constructor(partial: Partial<LoginResDTO>) {
    Object.assign(this, partial)
  }
}

export class RefreshTokenBodyDTO {
  @IsString()
  refreshToken: string
}
export class RefreshTokenResDTO extends LoginResDTO {}

export class LogoutBodyDTO extends RefreshTokenBodyDTO {}

export class LogoutResDTO {
  message: string
  constructor(partial: Partial<LogoutResDTO>) {
    Object.assign(this, partial)
  }
}
