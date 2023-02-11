"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deserializeUser_1 = require("../middleWare/deserializeUser");
const students_controller_1 = require("../controllers/students.controller");
const studentRouter = express_1.default.Router();
studentRouter.use(deserializeUser_1.deserializeUser /*, requireUser*/);
studentRouter.post("/addStudent", students_controller_1.addStudent);
exports.default = studentRouter;
