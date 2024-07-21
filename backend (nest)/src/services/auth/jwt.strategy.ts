import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { BearerParser } from 'bearer-token-parser'
import { Request as RequestType } from 'express';

import { RedisService } from '@services/redis/redis.service'


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly redis: RedisService,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken()
      ]),
      passReqToCallback: true,
    })
  }

  static extractJWT(req: RequestType): string | null {
    if (req.cookies && 'jwt' in req.cookies ) {
      return req.cookies.jwt;
    }

    return BearerParser.parseBearerTokenHeader(req);
  }

  async validate(req: RequestType) {
    console.log("validate")
    const jwt = JwtStrategy.extractJWT(req)
    console.log(jwt)
    const sessionData = await this.redis.get(jwt)

    if (!sessionData) {
      throw new UnauthorizedException()
    } else {
      return sessionData
    }
  }
}
