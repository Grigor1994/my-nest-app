import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class PostRepository extends Repository<Post> {
  constructor(@InjectRepository(Post) private repository: Repository<Post>) {
    super(repository.target, repository.manager);
  }
}
