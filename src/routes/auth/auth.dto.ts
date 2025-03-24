import { Exclude, Expose } from 'class-transformer'
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

export class RegisterResDTO {
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

  constructor(partial: Partial<RegisterResDTO>) {
    Object.assign(this, partial)
  }
}
