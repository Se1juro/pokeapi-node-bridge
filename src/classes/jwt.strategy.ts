import { VerifiedCallback, ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-jwt";
import { PUBLIC_KEY } from "../constants/auth.constant";

export class JwtStrategy extends Strategy {
  constructor() {
    super(
      {
        secretOrKey: PUBLIC_KEY,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        algorithms: ["RS256"],
      },
      JwtStrategy.verify
    );
  }

  static verify(payload: any, done: VerifiedCallback): void {
    return done(null, payload);
  }
}
