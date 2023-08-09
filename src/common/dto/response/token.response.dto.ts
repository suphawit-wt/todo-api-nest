import { ApiProperty } from '@nestjs/swagger';

export class TokenResponse {
  @ApiProperty()
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
