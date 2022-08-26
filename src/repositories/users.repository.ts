import { DeepPartial } from "typeorm";
import { AppDataSource } from "../configDb";
import { Users } from "../models/users.model";

export const UsersRepository = AppDataSource.getRepository(Users).extend({
  async findUsers(page?: number, limit?: number): Promise<Users[]> {
    return await this.find();
  },

  async findUserById(_id: string): Promise<Users | null> {
    return await this.findOneById(_id);
  },

  async findByNickName(nickName: string): Promise<Users | null> {
    return await this.findOneBy({ nickName });
  },
});
