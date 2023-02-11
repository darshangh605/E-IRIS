"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
//import { forgotPassword } from "../controllers/auth.controller";
const user_controller_2 = require("../controllers/user.controller");
const deserializeUser_1 = require("../middleWare/deserializeUser");
const userRouter = express_1.default.Router();
userRouter.use(deserializeUser_1.deserializeUser /*, requireUser*/);
//userRouter.post("/forgotPassword", forgotPassword);
// Admin Get Users route
userRouter.get("/", user_controller_1.getAllUsersHandler);
// Get my info route
userRouter.get("/me", user_controller_1.getMeHandler);
userRouter.get("/getData", user_controller_2.getDataToLoadScreen);
exports.default = userRouter;
