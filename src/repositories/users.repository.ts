import Users from "../models/users.model";
/* 
let dataSource = dbDevelopment;
switch (process.env.NODE_ENV) {
  case "production":
    dataSource = dbProduction;
    break;
}

export const UsersRepository = dataSource.getRepository(Users).extend({
  async findUsers(): Promise<Users[]> {
    return await this.find();
  },

  async findUserById(_id: string): Promise<Users | null> {
    return await this.findOneById(_id);
  },

  async findByNickName(nickName: string): Promise<Users | null> {
    return await this.findOneBy({ nickName });
  },
}); */

import { Service } from "typedi";
import { IUser } from "../interfaces/user.interface";

@Service()
export class UsersRepository {
  async createUser(user: IUser) {
    const newUser = new Users(user);
    newUser.save((err) => {
      if (err) return err;
    });
    return user;
  }

  findByNickName(nickName: string) {
    return Users.findOne({ nickName });
  }
}
