import { resolve } from "path";
import { DataSource } from "typeorm";
export const AppDataSource = new DataSource({
  name: "default",
  type: "mongodb",
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  authSource: "admin",
  synchronize: false,
  logging: true,
  entities: [resolve("./src/models/**/*.ts")],
  migrations: [resolve("./src/migrations/*.ts")],
});
