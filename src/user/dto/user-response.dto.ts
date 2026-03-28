import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '../user.entity';

export class UserResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiPropertyOptional()
  patronymic?: string;

  @ApiProperty({ default: false })
  isStudent: boolean = false;

  constructor(data: User) {
    this.id = data.id;
    this.name = data.name;
    this.surname = data.surname;
    this.surname = data.surname ?? null;
    this.isStudent = data.isStudent;
  }
}
