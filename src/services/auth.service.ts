import { BadRequestError, NotFoundError } from "routing-controllers";
import { Service } from "typedi";
import { DeepPartial } from "typeorm";
import { Users } from "../models/users.model";
import { UsersRepository } from "../repositories/users.repository";
import { sign } from "jsonwebtoken";
import { comparePassword } from "../utils/auth/comparePassword.util";
import { PRIVATE_KEY } from "../constants/auth.constant";
import { UserService } from "./users.service";

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
    });
    await this.userService.updateLastLoggin(userLogin);
    return { token };
  }

  async generateToken(user: DeepPartial<Users>): Promise<string> {
    let token = sign({ ...user }, PRIVATE_KEY, {
      expiresIn: 86400,
      algorithm: "RS256",
    });
    return token;
  }
}
