import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Token header se uthayega
      ignoreExpiration: false,
      secretOrKey: 'mysecretkey', // 🔑 yeh secret tum .env me bhi daal sakte ho
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, email: payload.email, role: payload.role }; // yeh req.user ban jata hai
  }
}
