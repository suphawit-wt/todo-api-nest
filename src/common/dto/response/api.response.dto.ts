import { ApiProperty } from '@nestjs/swagger';

export class ApiRes {
  @ApiProperty({ default: 'SUCCESS' })
  code: string = 'SUCCESS';

  @ApiProperty()
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export class ApiResWithData<T> {
  @ApiProperty({ default: 'SUCCESS' })
  code: string = 'SUCCESS';

  @ApiProperty()
  data: T;

  constructor(data: T) {
    this.data = data;
  }
}

export class ApiResWithError {
  @ApiProperty()
  code: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  errors: string[];

  constructor(code: string, message: string, errors: string[]) {
    this.code = code;
    this.message = message;
    this.errors = errors;
  }
}