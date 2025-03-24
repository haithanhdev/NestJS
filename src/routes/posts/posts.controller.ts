import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { PostsService } from './posts.service'
// import { AccessTokenGuard } from 'src/shared/guards/access-token.guard'
// import { APIKeyGuard } from 'src/shared/guards/api-key.guard'
import { Auth } from 'src/shared/decorators/auth.decorator'
import { AuthType, ConditionGuard } from 'src/shared/constants/auth.contants'
// import { AuthenticationGuard } from 'src/shared/guards/authentication.guard'

@Controller('posts')
export class PostsController {
  constructor(private readonly postServices: PostsService) {}

  // @UseGuards(AccessTokenGuard)
  // @UseGuards(APIKeyGuard)
  @Auth([AuthType.Bearer, AuthType.APIKey], { condition: ConditionGuard.Or })
  // @UseGuards(AuthenticationGuard) //Khai báo global rồi nên route nào cũng có
  @Get()
  getPosts() {
    return this.postServices.getPosts()
  }

  @Post()
  createPost(@Body() body: any) {
    return this.postServices.createPost(body)
  }

  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postServices.getPost(id)
  }

  @Put(':id')
  updatePost(@Param('id') id: string, @Body() body: any) {
    return this.postServices.updatePost(id, body)
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postServices.deletePost(id)
  }
}
