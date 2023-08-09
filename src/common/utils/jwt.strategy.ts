import { Injectable } from '@nestjs/common/decorators';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '@app/entities';
import { UnauthorizedError } from '@app/common/exceptions';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
      algorithms: 'HS256',
      ignoreExpiration: false,
    });
  }

  async validate(payload: any): Promise<User> {
    const userId: number = parseInt(payload.sub);
    if (!userId) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const user = new User();
    user.id = userId;

    return user;
  }

}