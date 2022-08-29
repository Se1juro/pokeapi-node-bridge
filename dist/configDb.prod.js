"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
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
