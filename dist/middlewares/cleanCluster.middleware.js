"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlerMiddleware = void 0;
const routing_controllers_1 = require("routing-controllers");
const cluster_1 = __importDefault(require("cluster"));
let ErrorHandlerMiddleware = class ErrorHandlerMiddleware {
    use(request, response, next) {
        var _a;
        (_a = cluster_1.default.worker) === null || _a === void 0 ? void 0 : _a.kill();
        next();
    }
};
ErrorHandlerMiddleware = __decorate([
    (0, routing_controllers_1.Middleware)({ type: "after", priority: 1 })
], ErrorHandlerMiddleware);
exports.ErrorHandlerMiddleware = ErrorHandlerMiddleware;
