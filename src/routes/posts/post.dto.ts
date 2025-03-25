import { Type } from 'class-transformer'
import { PostModel } from 'src/shared/models/post.model'
import { UserModel } from 'src/shared/models/user.model'

export class GetPostItemDTO extends PostModel {
  //Khi sử dụng class khác cho thuộc tính thì phải dùng @Type
  @Type(() => UserModel)
  author: Omit<UserModel, 'password'>
  constructor(partial: Partial<GetPostItemDTO>) {
    //extends thì phải super trong constructor
    super(partial)
    Object.assign(this, partial)
  }
}
