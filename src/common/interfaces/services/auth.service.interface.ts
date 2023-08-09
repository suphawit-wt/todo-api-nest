import { LoginRequest, RegisterRequest } from '@app/common/dto/request';
import { TokenResponse } from '@app/common/dto/response';

export interface IAuthService {
  login(req: LoginRequest): Promise<TokenResponse>;
  register(req: RegisterRequest): Promise<void>;
}