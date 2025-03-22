import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { PostsService } from './posts.service'

@Controller('posts')
export class PostsController {
  constructor(private readonly postServices: PostsService) {}
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
