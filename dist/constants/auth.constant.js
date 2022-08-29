"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUBLIC_KEY = exports.PRIVATE_KEY = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
exports.PRIVATE_KEY = (0, fs_1.readFileSync)((0, path_1.resolve)("./secrets/private.key"));
exports.PUBLIC_KEY = (0, fs_1.readFileSync)((0, path_1.resolve)("./secrets/public.pem"));
