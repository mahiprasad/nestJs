import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtConstants } from './auth.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: JwtConstants.secret,
        });
      }

    async validate(payload: any){
        return{ email: payload.email}
    }
}