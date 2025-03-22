import { Injectable } from '@nestjs/common'

@Injectable()
export class PostsService {
  getPosts() {
    return 'All posts'
  }
  getPost(id: string) {
    return `Post ${id}`
  }
  createPost(body: any) {
    return body
  }
  updatePost(id: string, body: any) {
    return `Update post ${id} with body ${body}`
  }
  deletePost(id: string) {
    return `Delete post ${id}`
  }
}
