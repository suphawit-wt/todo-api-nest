import { Module } from '@nestjs/common/decorators';
import { forwardRef } from '@nestjs/common/utils';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@app/modules';
import { AuthController } from '@app/controllers';
import { AuthService } from '@app/services';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE,
        algorithm: 'HS256',
        expiresIn: '12h',
      },
      verifyOptions: {
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE,
        algorithms: ['HS256'],
        ignoreExpiration: false,
      },
    }),
    forwardRef(() => UserModule)
  ],
  controllers: [AuthController],
  providers: [AuthService],
})

export class AuthModule { }