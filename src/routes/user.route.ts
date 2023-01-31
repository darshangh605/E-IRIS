import express from "express";
import {
  getAllUsersHandler,
  getMeHandler,
} from "../controllers/user.controller";
//import { forgotPassword } from "../controllers/auth.controller";
import { getDataToLoadScreen } from "../controllers/user.controller";
import { deserializeUser } from "../middleWare/deserializeUser";
import { requireUser } from "../middleWare/requireUser";
import { restrictTo } from "../middleWare/restrictTo";

const userRouter = express.Router();
userRouter.use(deserializeUser /*, requireUser*/);
//userRouter.post("/forgotPassword", forgotPassword);
// Admin Get Users route
userRouter.get("/", getAllUsersHandler);

// Get my info route
userRouter.get("/me", getMeHandler);

userRouter.get("/getData", getDataToLoadScreen);

export default userRouter;
