import { Exclude } from 'class-transformer'

export class UserModel {
  id: number
  email: string
  name: string
  //Chỉ ảnh hưởng đến validation chứ không ảnh hưởng đến type
  @Exclude() password: string
  createdAt: Date
  updatedAt: Date
  constructor(partial: Partial<UserModel>) {
    Object.assign(this, partial)
  }
}
