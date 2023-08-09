import { Injectable } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedError } from '@app/common/exceptions';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any) {
        if (err || !user) {
            throw new UnauthorizedError('Invalid credentials.');
        }

        return user;
    }
}