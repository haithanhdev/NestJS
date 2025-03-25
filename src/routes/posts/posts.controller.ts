import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { PostsService } from './posts.service'
import { Auth } from 'src/shared/decorators/auth.decorator'
import { AuthType, ConditionGuard } from 'src/shared/constants/auth.contants'
import { ActiveUser } from 'src/shared/decorators/active-user.decorator'
import { CreatePostBodyDTO, GetPostItemDTO, UpdatePostBodyDTO } from 'src/routes/posts/post.dto'

@Controller('posts')
export class PostsController {
  constructor(private readonly postServices: PostsService) {}

  @Auth([AuthType.Bearer, AuthType.APIKey], { condition: ConditionGuard.Or })
  @Get()
  getPosts(@ActiveUser('userId') userId: number) {
    return this.postServices.getPosts(userId).then((posts) => posts.map((post) => new GetPostItemDTO(post)))
  }

  @Auth([AuthType.Bearer])
  @Post()
  async createPost(@Body() body: CreatePostBodyDTO, @ActiveUser('userId') userId: number) {
    return new GetPostItemDTO(await this.postServices.createPost(body, userId))
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    const postId = Number(id)
    return new GetPostItemDTO(await this.postServices.getPost(postId))
  }

  @Put(':id')
  @Auth([AuthType.Bearer])
  async updatePost(@Param('id') id: string, @Body() body: UpdatePostBodyDTO, @ActiveUser('userId') userId: number) {
    const postId = Number(id)
    return new GetPostItemDTO(await this.postServices.updatePost({ postId, body, userId }))
  }

  @Auth([AuthType.Bearer])
  @Delete(':id')
  deletePost(@Param('id') id: string, @ActiveUser('userId') userId: number): Promise<boolean> {
    const postId = Number(id)
    return this.postServices.deletePost(postId, userId)
  }
}
