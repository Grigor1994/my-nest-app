import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './dto/user-response.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async createUser(payload: CreateUserDto): Promise<UserResponse> {
    const user = await this.repository.save({ ...payload });
    return new UserResponse(user);
  }

  async registerUser(data: User): Promise<UserResponse> {
    const user = await this.repository.save(data);
    return new UserResponse(user);
  }

  async getUserByNickname(username: string): Promise<User | null> {
    return this.repository.findOne({
      where: { name: username },
      select: {id: true, name: true, password: true },
    });
  }
}
