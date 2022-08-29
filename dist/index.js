"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const app_1 = __importDefault(require("./app"));
const configDb_dev_1 = require("./configDb.dev");
const configDb_prod_1 = require("./configDb.prod");
const os_1 = __importDefault(require("os"));
const cluster_1 = __importDefault(require("cluster"));
const path_1 = require("path");
const numCpu = os_1.default.cpus().length;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log((0, path_1.resolve)(__dirname, "./models/*.js"));
        (0, routing_controllers_1.useContainer)(typeorm_typedi_extensions_1.Container);
        switch (process.env.NODE_ENV) {
            case "development":
                yield configDb_dev_1.AppDataSource.initialize();
                break;
            case "production":
                yield configDb_prod_1.AppDataSource.initialize();
                break;
        }
        console.log("Database connected");
        if (process.env.NODE_ENV === "production" && cluster_1.default.isPrimary) {
            for (let i = 0; i <= numCpu; i++) {
                cluster_1.default.fork();
            }
            cluster_1.default.on("exit", (worker, code, signal) => {
                console.log(`Worker ${worker.process.pid} died`);
                cluster_1.default.fork();
            });
        }
        else {
            app_1.default.listen(process.env.PORT);
        }
        console.log(`🚀 Server listening on port ${process.env.PORT} and process ${process.pid}`);
    }
    catch (error) {
        console.log("An error happened");
        console.log(error);
    }
});
main();
