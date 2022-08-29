"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
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
    entities: ["./src/models/*{.ts,.js}"],
    migrations: ["./src/migrations/*{.ts,.js}"],
});
