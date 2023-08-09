import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class LoginRequest {
  @ApiProperty()
  @IsString()
  @Length(5, 50)
  username: string;

  @ApiProperty()
  @IsString()
  @Length(5, 255)
  password: string;
}