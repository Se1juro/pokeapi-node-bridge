import { BadRequestError, NotFoundError } from "routing-controllers";
import { Service } from "typedi";
import { DeepPartial } from "typeorm";
import { Users } from "../models/users.model";
import { UsersRepository } from "../repositories/users.repository";
import { sign, verify } from "jsonwebtoken";
import { comparePassword } from "../utils/auth/comparePassword.util";
import { PRIVATE_KEY } from "../constants/auth.constant";
import { UserService } from "./users.service";
import { genSaltSync, hashSync } from "bcryptjs";
import { IUserLogged } from "../interfaces/userLogged.interface";

@Service()
export class AuthService {
  constructor(protected readonly userService: UserService) {}
  async sigIn(user: DeepPartial<Users>) {
    const { nickName, password } = user;
    const userLogin = await UsersRepository.findByNickName(String(nickName));

    if (!userLogin) throw new NotFoundError("Usuario no encontrado");
    const comparePass = comparePassword(String(password), userLogin.password);

    if (!comparePass) throw new BadRequestError("Credenciales incorrectas");

    const token = await this.generateToken({
      id: userLogin.id,
      nickName,
      lastConnection: userLogin.lastConnection,
      team: userLogin.team,
      name: userLogin.name,
    });
    await this.userService.updateLastLoggin(userLogin);

    return { token };
  }

  async signUp(payload: DeepPartial<Users>) {
    const { nickName } = payload;
    let userExists = await UsersRepository.findByNickName(String(nickName));

    if (userExists) throw new BadRequestError("El usuario ya existe");
    const salt = genSaltSync(5);

    const hashPassword = hashSync(String(payload.password), salt);

    const newUser = UsersRepository.create({
      ...payload,
      lastConnection: new Date(),
      password: hashPassword,
    });

    const userSaved = await UsersRepository.save(newUser);
    let token = await this.generateToken(userSaved);

    return { user: userSaved, token };
  }

  async checkAuth(userLogged: IUserLogged) {
    const { token } = userLogged;
    if (!token) return { logged: false, user: undefined };
    try {
      let authVerify = verify(token, PRIVATE_KEY, {
        algorithms: ["RS256"],
      });
      return { user: authVerify, logged: true };
    } catch (error) {
      return {
        logged: false,
        user: undefined,
      };
    }
  }

  async generateToken(user: DeepPartial<Users>): Promise<string> {
    let token = sign({ ...user }, PRIVATE_KEY, {
      expiresIn: 86400,
      algorithm: "RS256",
    });

    return token;
  }
}
