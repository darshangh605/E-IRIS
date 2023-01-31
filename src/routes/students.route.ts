import express from "express";
import { deserializeUser } from "../middleWare/deserializeUser";
import { requireUser } from "../middleWare/requireUser";
import { restrictTo } from "../middleWare/restrictTo";
import { addStudent } from "../controllers/students.controller";

const studentRouter = express.Router();
studentRouter.use(deserializeUser /*, requireUser*/);
studentRouter.post("/addStudent", addStudent);

export default studentRouter;
