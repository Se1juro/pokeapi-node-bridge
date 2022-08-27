import passport from "passport";
import {
  ExpressMiddlewareInterface,
  UnauthorizedError,
} from "routing-controllers";
import { Response } from "express";
import { JwtStrategy } from "../classes/jwt.strategy";

import { IRequest } from "../interfaces/IRequest.interface";
import { ISession } from "../interfaces/ISession.interface";

export class AuthJwtMiddleare implements ExpressMiddlewareInterface {
  authenticate(callback: (...args: any[]) => any) {
    return passport.use(new JwtStrategy()).authenticate(["jwt"], callback);
  }

  async use(
    request: IRequest,
    response: Response,
    next: (err?: any) => any
  ): Promise<any> {
    return this.authenticate((err: Error, user: ISession, info: any) => {
      if (err || !user) {
        const message = err ? err.message : "Sin Autorizacion";
        return next(new UnauthorizedError("Sin Autorizacion"));
      }
      request.user = user;
      return next();
    })(request, response, next);
  }
}
