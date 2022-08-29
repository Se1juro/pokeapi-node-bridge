"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_jwt_2 = require("passport-jwt");
const auth_constant_1 = require("../constants/auth.constant");
class JwtStrategy extends passport_jwt_2.Strategy {
    constructor() {
        super({
            secretOrKey: auth_constant_1.PUBLIC_KEY,
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            algorithms: ["RS256"],
        }, JwtStrategy.verify);
    }
    static verify(payload, done) {
        return done(null, payload);
    }
}
exports.JwtStrategy = JwtStrategy;
