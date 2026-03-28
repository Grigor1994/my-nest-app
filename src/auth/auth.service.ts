import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { User } from '../user/user.entity';
import { JwtPayload } from './auth.interface';
import { jwtConfig } from '../config/jwt.config';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './dto/login.response';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {
  }

  async register(payload: RegisterDto): Promise<{ message: string }> {
    const hashedPassword = await bcrypt.hash(payload.password, 10);

    await this.userService.registerUser(
      new User({ ...payload, password: hashedPassword }),
    );

    return { message: 'User registered successfully' };
  }

  verifyToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, jwtConfig.secret) as JwtPayload;
    } catch (error) {
      throw new UnauthorizedException(`Invalid or expired token`);
    }
  }

  async login(dto: LoginDto): Promise<LoginResponse> {
    const user = await this.userService.getUserByNickname(dto.name);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }


    const isValidPassword = await bcrypt.compare(dto.password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload: JwtPayload = {
      sub: String(user.id),
      name: user.name,
    };

    // @ts-ignore
    const accessToken = jwt.sign(payload, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });
    return { accessToken };
  }
}
