import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  patronymic?: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  @IsNotEmpty()
  isStudent: boolean = false;
}
