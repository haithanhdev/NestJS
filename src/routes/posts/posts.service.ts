import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.service'

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}
  getPosts() {
    return this.prismaService.post.findMany({})
  }
  getPost(id: string) {
    return `Post ${id}`
  }
  createPost(body: any, userId: number) {
    return this.prismaService.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    })
  }
  updatePost(id: string, body: any) {
    return `Update post ${id} with body ${body}`
  }
  deletePost(id: string) {
    return `Delete post ${id}`
  }
}
