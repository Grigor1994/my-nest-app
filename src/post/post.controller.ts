import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Post')
@Controller('posts')
export class PostController {
  constructor(private readonly service: PostService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createPost(@Req() req, @Body() dto: CreatePostDto): Promise<void> {
    await this.service.createPost(req, dto);
  }
}


/// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzIiwibmFtZSI6InRlc3QiLCJpYXQiOjE3NzM5MzY2MDMsImV4cCI6MTc3NDU0MTQwM30.LKYGTUAnKi8Ypg4Ysqrombdbs2tVAzGXYKepn0TcLGE
