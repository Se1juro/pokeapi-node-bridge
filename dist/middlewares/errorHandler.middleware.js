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
const axios_1 = __importDefault(require("axios"));
const routing_controllers_1 = require("routing-controllers");
let ErrorHandlerMiddleware = class ErrorHandlerMiddleware {
    error(error, request, response, next) {
        if (error instanceof axios_1.default.Cancel)
            return;
        const { message, name, errors = [], httpCode = 500 } = error;
        response.status(httpCode).json({
            httpCode,
            message: message,
            type: name,
            errors,
        });
        next();
    }
};
ErrorHandlerMiddleware = __decorate([
    (0, routing_controllers_1.Middleware)({ type: "after", priority: 1 })
], ErrorHandlerMiddleware);
exports.ErrorHandlerMiddleware = ErrorHandlerMiddleware;
