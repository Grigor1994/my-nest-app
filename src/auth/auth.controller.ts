import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './dto/login.response';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<{ message: string }> {
    return this.service.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto): Promise<LoginResponse> {
    return this.service.login(dto);
  }
}
