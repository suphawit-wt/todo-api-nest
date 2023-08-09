import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class CreateTodoRequest {
  @ApiProperty()
  @IsString()
  @Length(1, 100)
  title: string;
}

export class UpdateTodoRequest {
  @ApiProperty()
  @IsString()
  @Length(1, 100)
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  completed: boolean;
}