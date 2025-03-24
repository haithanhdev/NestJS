import { Exclude, Type } from 'class-transformer'
import { IsString } from 'class-validator'
import { SuccessResDTO } from 'src/shared/shared.dto'

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
