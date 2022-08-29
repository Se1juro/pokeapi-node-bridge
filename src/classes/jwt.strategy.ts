import { VerifiedCallback, ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-jwt";
import { PUBLIC_KEY } from "../constants/auth.constant";
import { ISession } from "../interfaces/ISession.interface";

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

  static verify(payload: ISession, done: VerifiedCallback): void {
    console.log(
      "🚀 ~ file: jwt.strategy.ts ~ line 18 ~ JwtStrategy ~ verify ~ payload",
      payload
    );
    return done(null, payload);
  }
}
