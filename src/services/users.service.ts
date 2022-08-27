import { NotFoundError } from "routing-controllers";
import { Service } from "typedi";
import { Users } from "../models/users.model";
import { UsersRepository } from "../repositories/users.repository";

@Service()
export class UserService {
  async getUsers(): Promise<Users[]> {
    return await UsersRepository.findUsers();
  }

  async getUserById(id: string): Promise<Users> {
    const user = await UsersRepository.findUserById(id);

    if (!user) throw new NotFoundError("");
    return user;
  }

  async updateLastLoggin(user: Users): Promise<Users> {
    return await UsersRepository.save({ ...user, lastConnection: new Date() });
  }
}
