import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { findUserById } from "../services/user.service";
import AppError from "../utils/appError";
import redisClient from "../utils/connectRedis";
import { verifyJwt } from "../utils/jwt";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the token
    let access_token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      access_token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.accessToken) {
      access_token = req.cookies.accessToken;
    }

    if (!access_token) {
      return res.status(401).json({
        status: StatusCodes.UNAUTHORIZED,
        message: "You are not logged in.",
      });
    }

    // Validate Access Token
    // const decoded = verifyJwt(access_token);

    // if (!decoded) {
    //   return next(new AppError(`Invalid token or user doesn't exist`, 401));
    // }

    // // Check if user has a valid session
    // const session = await redisClient.get(decoded.sub);
    // if (!session) {
    //   return next(new AppError(`User session has expired`, 401));
    // }

    // // // Check if user still exist
    // const user = await findUserById(JSON.parse(session)._id);

    // if (!user) {
    //   return next(new AppError(`User with that token no longer exist`, 401));
    // }

    // // This is really important (Helps us know if the user is logged in from other controllers)
    // // You can do: (req.user or res.locals.user)
    //res.locals.user = user;

    next();
  } catch (err: any) {
    next(err);
  }
};
