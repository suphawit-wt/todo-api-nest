import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterRequest {
  @ApiProperty()
  @IsString()
  @Length(5, 50)
  username: string;

  @ApiProperty()
  @IsString()
  @Length(5, 255)
  password: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;
}
