"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthJwtMiddleare = void 0;
const passport_1 = __importDefault(require("passport"));
const routing_controllers_1 = require("routing-controllers");
const jwt_strategy_1 = require("../classes/jwt.strategy");
class AuthJwtMiddleare {
    authenticate(callback) {
        return passport_1.default.use(new jwt_strategy_1.JwtStrategy()).authenticate(["jwt"], callback);
    }
    use(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authenticate((err, user, info) => {
                if (err || !user) {
                    const message = err ? err.message : "Sin Autorizacion";
                    return next(new routing_controllers_1.UnauthorizedError("Sin Autorizacion"));
                }
                request.user = user;
                return next();
            })(request, response, next);
        });
    }
}
exports.AuthJwtMiddleare = AuthJwtMiddleare;
