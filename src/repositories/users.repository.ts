import { AppDataSource } from "../configDb";
import { Users } from "../models/users.model";

export const UsersRepository = AppDataSource.getRepository(Users).extend({});
