import { DataSource } from "typeorm";
import { resolve } from "path";
import { Users } from "./models/users.model";
export const AppDataSource = new DataSource({
  name: "default",
  type: "mongodb",
  url: process.env.DATABASE_URL,
  database: process.env.DATABASE_NAME,
  authSource: "admin",
  synchronize: false,
  logging: true,
  entities: [Users],
});
