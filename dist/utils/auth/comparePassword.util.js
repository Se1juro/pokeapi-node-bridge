"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = void 0;
const bcryptjs_1 = require("bcryptjs");
const comparePassword = (passwordBody, passwordSaved) => {
    return (0, bcryptjs_1.compareSync)(passwordBody, passwordSaved);
};
exports.comparePassword = comparePassword;
