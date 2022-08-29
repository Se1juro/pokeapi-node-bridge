"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const users_repository_1 = require("../repositories/users.repository");
const jsonwebtoken_1 = require("jsonwebtoken");
const comparePassword_util_1 = require("../utils/auth/comparePassword.util");
const auth_constant_1 = require("../constants/auth.constant");
const users_service_1 = require("./users.service");
const bcryptjs_1 = require("bcryptjs");
let AuthService = class AuthService {
    constructor(userService) {
        this.userService = userService;
    }
    sigIn(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nickName, password } = user;
            const userLogin = yield users_repository_1.UsersRepository.findByNickName(String(nickName));
            if (!userLogin)
                throw new routing_controllers_1.NotFoundError("Usuario no encontrado");
            const comparePass = (0, comparePassword_util_1.comparePassword)(String(password), userLogin.password);
            if (!comparePass)
                throw new routing_controllers_1.BadRequestError("Credenciales incorrectas");
            const token = yield this.generateToken({
                id: userLogin.id,
                nickName,
                lastConnection: userLogin.lastConnection,
                team: userLogin.team,
                name: userLogin.name,
            });
            yield this.userService.updateLastLoggin(userLogin);
            return { token };
        });
    }
    signUp(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nickName } = payload;
            const userExists = yield users_repository_1.UsersRepository.findByNickName(String(nickName));
            if (userExists)
                throw new routing_controllers_1.BadRequestError("El usuario ya existe");
            const salt = (0, bcryptjs_1.genSaltSync)(5);
            const hashPassword = (0, bcryptjs_1.hashSync)(String(payload.password), salt);
            const newUser = users_repository_1.UsersRepository.create(Object.assign(Object.assign({}, payload), { lastConnection: new Date(), password: hashPassword }));
            const userSaved = yield users_repository_1.UsersRepository.save(newUser);
            const token = yield this.generateToken(userSaved);
            return { user: userSaved, token };
        });
    }
    checkAuth(userLogged) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = userLogged;
            if (!token)
                return { logged: false, user: undefined };
            try {
                const authVerify = (0, jsonwebtoken_1.verify)(token, auth_constant_1.PRIVATE_KEY, {
                    algorithms: ["RS256"],
                });
                return { user: authVerify, logged: true };
            }
            catch (error) {
                return {
                    logged: false,
                    user: undefined,
                };
            }
        });
    }
    generateToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = (0, jsonwebtoken_1.sign)(Object.assign({}, user), auth_constant_1.PRIVATE_KEY, {
                expiresIn: 86400,
                algorithm: "RS256",
            });
            return token;
        });
    }
};
AuthService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [users_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
