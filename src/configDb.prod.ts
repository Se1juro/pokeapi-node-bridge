import { DataSource } from "typeorm";
export const AppDataSource = new DataSource({
  name: "default",
  type: "mongodb",
  url: process.env.DATABASE_URL,
  database: process.env.DATABASE_NAME,
  authSource: "admin",
  synchronize: false,
  logging: true,
  entities: ["./src/models/*.js"],
  migrations: ["./src/migrations/*.js"],
});
