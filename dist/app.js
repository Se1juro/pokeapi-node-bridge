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
require("dotenv/config");
const morgan_1 = __importDefault(require("morgan"));
const routing_controllers_1 = require("routing-controllers");
const path_1 = __importDefault(require("path"));
const app = (0, routing_controllers_1.createExpressServer)({
    routePrefix: "/pokeapi",
    validation: {
        validationError: {
            target: false,
        },
    },
    defaultErrorHandler: false,
    classTransformer: true,
    controllers: [path_1.default.join(__dirname + "/controllers/*.ts")],
    middlewares: [path_1.default.join(__dirname + "/middlewares/*.ts")],
    cors: true,
    currentUserChecker: (action) => __awaiter(void 0, void 0, void 0, function* () {
        return action.request.user;
    }),
});
app.use((0, morgan_1.default)("dev"));
exports.default = app;
