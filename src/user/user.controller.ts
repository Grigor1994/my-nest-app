import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './dto/user-response.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user') // base path
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() data: CreateUserDto): Promise<UserResponse> {
    return this.userService.createUser(data);
  }
}
