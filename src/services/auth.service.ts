import { NotFoundError } from "routing-controllers";
import { Service } from "typedi";
import { DeepPartial } from "typeorm";
import { Users } from "../models/users.model";
import { UsersRepository } from "../repositories/users.repository";

@Service()
export class AuthService {
  async sigIn(user: DeepPartial<Users>) {
    const { nickName } = user;
    const userLogin = await UsersRepository.findByNickName(String(nickName));

    if (!userLogin) throw new NotFoundError("Usuario no encontrado");
  }

  async generateToken(user: DeepPartial<Users>) {
    const { nickName } = user;
    const userLogin = await UsersRepository.findByNickName(String(nickName));

    if (!userLogin) throw new NotFoundError("Usuario no encontrado");
  }
}
