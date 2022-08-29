"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const path_1 = require("path");
exports.AppDataSource = new typeorm_1.DataSource({
    name: "default",
    type: "mongodb",
    url: process.env.DATABASE_URL,
    database: process.env.DATABASE_NAME,
    authSource: "admin",
    synchronize: false,
    logging: true,
    entities: [(0, path_1.resolve)(__dirname, "./models/*{.ts,.js}")],
});
