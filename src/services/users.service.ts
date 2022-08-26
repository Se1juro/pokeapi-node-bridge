import { NotFoundError } from "routing-controllers";
import { Service } from "typedi";
import { DeepPartial, DeleteResult } from "typeorm";
import { Users } from "../models/users.model";
import { UsersRepository } from "../repositories/users.repository";

@Service()
export class UserService {
  async createUser(payload: DeepPartial<Users>): Promise<Users> {
    /* const { id } = payload;
    let userExists: Users | null = null;
    if (id) userExists = await this.userRepository.findUserById(id);

    if (!userExists && id) throw new NotFoundError(""); */

    const newUser = UsersRepository.create(payload);

    return await UsersRepository.save(newUser);
  }
}
