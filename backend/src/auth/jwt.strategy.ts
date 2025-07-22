
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/schemas/user.schema';

type JwtPayload = {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'staff';
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<Partial<User & {_id: string}>> {
    // The payload is already verified at this point.
    // We can trust its content.
    // The object returned here will be attached to the request as `req.user`.
    return { 
        _id: payload.sub, 
        email: payload.email, 
        firstName: payload.firstName, 
        lastName: payload.lastName,
        role: payload.role 
    };
  }
}
