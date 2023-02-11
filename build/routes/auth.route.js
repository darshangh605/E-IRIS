"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const authrouter = express_1.default.Router();
// Register user route
authrouter.post("/register", auth_controller_1.registerHandler);
// Login user route
authrouter.post("/login", auth_controller_1.loginHandler);
authrouter.post("/logout", auth_controller_1.logout);
exports.default = authrouter;
