import express from "express";
import {
  loginHandler,
  logout,
  registerHandler,
} from "../controllers/auth.controller";

const authrouter = express.Router();

// Register user route
authrouter.post("/register", registerHandler);

// Login user route
authrouter.post("/login", loginHandler);
authrouter.post("/logout", logout);
export default authrouter;
