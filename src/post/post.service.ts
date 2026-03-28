import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';
import { Request } from 'express';

@Injectable()
export class PostService {
  constructor(private readonly repository: PostRepository) {}

  async createPost({ user }: Request, dto: CreatePostDto): Promise<void> {
    const userId = Number(user?.sub);
    await this.repository.save(
      new Post({
        ...dto,
        userId,
      }),
    );
  }
}
