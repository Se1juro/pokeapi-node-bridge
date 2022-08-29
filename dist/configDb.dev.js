"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const path_1 = require("path");
exports.AppDataSource = new typeorm_1.DataSource({
    name: "default",
    type: "mongodb",
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    authSource: "admin",
    synchronize: false,
    logging: true,
    entities: [(0, path_1.resolve)(__dirname, "./models/*{.ts,.js}")],
    migrations: ["./src/migrations/*{.ts,.js}"],
});
