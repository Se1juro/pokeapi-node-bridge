import { NotFoundError } from "routing-controllers";
import { Service } from "typedi";
import { IUser } from "../interfaces/user.interface";
import { UsersRepository } from "../repositories/users.repository";

@Service()
export class UserService {
  constructor(private userRepository: UsersRepository) {}
  async updateLastLoggin(user: IUser) {
    return await this.userRepository.createUser({
      ...user,
      lastConnection: new Date(),
    });
  }
}
