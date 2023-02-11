"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const deserializeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the token
        let access_token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            access_token = req.headers.authorization.split(" ")[1];
        }
        else if (req.cookies.accessToken) {
            access_token = req.cookies.accessToken;
        }
        if (!access_token) {
            return res.status(401).json({
                status: http_status_codes_1.StatusCodes.UNAUTHORIZED,
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
    }
    catch (err) {
        next(err);
    }
});
exports.deserializeUser = deserializeUser;
