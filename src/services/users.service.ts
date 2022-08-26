import { BadRequestError, NotFoundError } from "routing-controllers";
import { Service } from "typedi";
import { DeepPartial, DeleteResult, ObjectID } from "typeorm";
import { Users } from "../models/users.model";
import { UsersRepository } from "../repositories/users.repository";
import { genSalt, hashSync } from "bcrypt";

@Service()
export class UserService {
  async createUser(payload: DeepPartial<Users>): Promise<Users> {
    const { nickName } = payload;
    let userExists = await UsersRepository.findByNickName(String(nickName));

    if (userExists) throw new BadRequestError("El usuario ya existe");

    const hashPassword = hashSync(String(payload.password), await genSalt(10));

    const newUser = UsersRepository.create({
      ...payload,
      lastConnection: new Date(),
      password: hashPassword,
    });

    return await UsersRepository.save(newUser);
  }

  async getUsers(): Promise<Users[]> {
    return await UsersRepository.findUsers();
  }

  async getUserById(id: string): Promise<Users> {
    const user = await UsersRepository.findUserById(id);

    if (!user) throw new NotFoundError("");
    return user;
  }
}
