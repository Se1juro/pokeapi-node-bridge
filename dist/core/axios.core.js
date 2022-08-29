"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosCore = void 0;
const axios_1 = __importDefault(require("axios"));
exports.axiosCore = axios_1.default.create({
    baseURL: "https://pokeapi.co/api/v2/",
    withCredentials: true,
    headers: {
        "access-control-allow-origin": "*",
    },
});
