import express, { NextFunction, Request, Response } from "express";
import config from "config";
import * as dotenv from "dotenv";
import connectDB from "./utils/connectDb";
import cookieParser from "cookie-parser";
import session from "express-session";
import morgan from "morgan";
import cors from "cors";
import connectRedis from "connect-redis";
import userRouter from "./routes/user.route";
import authrouter from "./routes/auth.route";
import redisClient from "./utils/connectRedis";
import studentRouter from "./routes/students.route";
dotenv.config();
const app = express();
app.use(express.json({ limit: "10kb" }));
const RedisStore = connectRedis(session);
// 2. Cookie Parser
app.use(cookieParser(process.env.ACCESS_TOKEN_PRIVATE_KEY));
app.use(express.urlencoded({ extended: true }));
app.use(session());
const port = process.env.PORT;
// 3. Logger
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// 4. Cors
app.use(cors());

// 5. Routes

// UnKnown Routes

// Global Error Handler
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   err.status = err.status || "error";
//   err.statusCode = err.statusCode || 500;

//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//   });
// });
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.ACCESS_TOKEN_PRIVATE_KEY!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
      maxAge: 1000 * 60 * 60, // session max age in miliseconds
    },
  })
);
app.use("/api/users", userRouter);
app.use("/api/auth", authrouter);
app.use("/api/students", studentRouter);
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
  connectDB();
});
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.url} not found`) as any;
  err.statusCode = 404;
  next(err);
});
