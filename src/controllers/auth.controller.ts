import { Controller } from '@nestjs/common/decorators/core';
import { Post, Res, Body } from '@nestjs/common/decorators/http';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from '@app/services';
import { LoginRequest, RegisterRequest } from '@app/common/dto/request';
import { TokenResponse, ApiRes, ApiResWithData } from '@app/common/dto/response';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('login')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login successfully'
  })
  async login(
    @Res() res: Response,
    @Body() reqBody: LoginRequest
  ): Promise<void> {
    const token: TokenResponse = await this.authService.login(reqBody);
    const response = new ApiResWithData(token);

    res.status(HttpStatus.OK).json(response);
  }

  @Post('register')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Register successfully',
  })
  async register(
    @Res() res: Response,
    @Body() reqBody: RegisterRequest
  ): Promise<void> {
    await this.authService.register(reqBody);
    const response = new ApiRes('Register Successfully');

    res.status(HttpStatus.CREATED).json(response);
  }

}