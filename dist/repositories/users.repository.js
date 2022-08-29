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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const configDb_prod_1 = require("../configDb.prod");
const configDb_dev_1 = require("../configDb.dev");
const users_model_1 = require("../models/users.model");
let dataSource = configDb_dev_1.AppDataSource;
switch (process.env.NODE_ENV) {
    case "production":
        dataSource = configDb_prod_1.AppDataSource;
        break;
}
exports.UsersRepository = dataSource.getRepository(users_model_1.Users).extend({
    findUsers(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.find();
        });
    },
    findUserById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOneById(_id);
        });
    },
    findByNickName(nickName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOneBy({ nickName });
        });
    },
});
