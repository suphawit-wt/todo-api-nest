import { Injectable } from '@nestjs/common/decorators';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IAuthService } from '@app/common/interfaces/services';
import { UserRepository } from '@app/repositories';
import { User } from '@app/entities';
import { UserRole } from '@app/common/valueobjects';
import { LoginRequest, RegisterRequest } from '@app/common/dto/request';
import { TokenResponse } from '@app/common/dto/response';
import { UnauthorizedError } from '@app/common/exceptions';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) { }

  async login(req: LoginRequest): Promise<TokenResponse> {
    const user: User | null = await this.userRepository.getByUsername(req.username);
    if (!user) {
      throw new UnauthorizedError('Username or Password is invalid.');
    }

    const passwordVerify: boolean = await bcrypt.compare(req.password, user.password);
    if (!passwordVerify) {
      throw new UnauthorizedError('Username or Password is invalid.');
    }

    const accessToken: string = this.jwtService.sign({ sub: user.id, role: UserRole.User });

    return new TokenResponse(accessToken);
  }

  async register(req: RegisterRequest): Promise<void> {
    const user = new User();
    user.username = req.username;
    user.password = await bcrypt.hash(req.password, 12);
    user.email = req.email;
    user.firstName = req.firstName;
    user.lastName = req.lastName;

    await this.userRepository.create(user);
  }

}