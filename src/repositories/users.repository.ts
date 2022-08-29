import { AppDataSource as dbProduction } from "../configDb.prod";
import { AppDataSource as dbDevelopment } from "../configDb.dev";
import { Users } from "../models/users.model";

let dataSource = dbDevelopment;
switch (process.env.NODE_ENV) {
  case "production":
    dataSource = dbProduction;
    break;
}

export const UsersRepository = dataSource.getRepository(Users).extend({
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
