import config from "config";
import { CookieOptions, NextFunction, Request, Response } from "express";
import { IUsers, Users } from "../models/users.model";
import { createUser, findUser, signToken } from "../services/user.service";
import AppError from "../utils/appError";
//import sendEmail from "../utils/sendMail";
import crypto from "crypto";
import { IRegisterUserRequest } from "../types/requestTypes";
import redisClient from "../utils/connectRedis";
import { StatusCodes } from "http-status-codes";
// Exclude this fields from the response
export const excludedFields = ["password"];
const expiresIn = "25";
// Cookie options
const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(Date.now() + parseInt(expiresIn) * 60 * 1000),
  maxAge: parseInt(expiresIn!) * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

// Only set secure to true in production
if (process.env.NODE_ENV === "production")
  accessTokenCookieOptions.secure = true;

export const registerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reqBody = req.body as IRegisterUserRequest;

  const userObj: IUsers = {
    firstName: reqBody.firstName,
    isActive: true,
    middleName: reqBody.middleName,
    lastName: reqBody.lastName,
    userName: reqBody.userName,
    password: reqBody.password,
    email: reqBody.email,
    contactNo: reqBody.contactNo,
    roleCode: reqBody.roleCode,
    role: reqBody.role,
    //lastLoggedIn: reqBody.lastLoggedIn,
    title: reqBody.title,
    titleCode: reqBody.titleCode,
    gender: reqBody.gender,
    genderCode: reqBody.genderCode,
    dob: reqBody.dob,
    maritalStatus: reqBody.maritalStatus,
    maritalStatusCode: reqBody.maritalStatusCode,
    qualification: reqBody.qualification,
    qualificationCode: reqBody.qualificationCode,
    department: reqBody.department,
    departmentCode: reqBody.departmentCode,
    nationality: reqBody.nationality,
    religion: reqBody.religion,
    religionCode: reqBody.religionCode,
    socialCategory: reqBody.socialCategory,
    socialCategoryCode: reqBody.socialCategoryCode,
    obcSubCategory: reqBody.obcSubCategory,
    obcSubCategoryCode: reqBody.obcSubCategoryCode,
    residentialAddress: reqBody.residentialAddress,
    permanentAddress: reqBody.permanentAddress,
  };
  try {
    const user = await createUser(userObj);
    user.password = undefined;
    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: StatusCodes.CONFLICT,
        message: "Email already exist",
      });
    }
    next(err);
  }
};

export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body as IUsers;
    // Get the user from the collection
    const user = await findUser({ email: email });
    if (!user) {
      return res.status(200).json({
        status: StatusCodes.NOT_FOUND,
        statusCode: "The User does not exists with this emailId",
      });
    } else if (!user.password || user?.password !== req.body.password) {
      return res.status(200).json({
        status: StatusCodes.UNAUTHORIZED,
        statusCode: "Invalid credentials",
      });
    }
    // Check if user exist and password is correct

    // Create an Access Token
    const { access_token } = await signToken(user);

    res.cookie("accessToken", access_token, accessTokenCookieOptions);
    res.cookie("logged_in", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });
    user.password = undefined;
    // Send Access Token
    res.status(200).json({
      status: StatusCodes.OK,
      statusCode: "Success",
      access_token,
      userDetails: user,
    });
  } catch (err: any) {
    res.status(500).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      statusCode: "Something went wrong from our side",
      error: err,
    });
  }
};

// export const forgotPassword = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   // 1) Get user based on POSTed email
//   const user = await Users.findOne({ email: req.body.email });
//   if (!user) {
//     return next(new AppError("There is no user with email address.", 404));
//   }

//   // 2) Generate the random reset token
//   const resetToken = user.createPasswordResetToken();
//   await user.save({ validateBeforeSave: false });

//   // 3) Send it to user's email
//   const resetURL = `${req.protocol}://${req.get(
//     "host"
//   )}/api/v1/users/resetPassword/${resetToken}`;

//   const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

//   try {
//     await sendEmail({
//       email: user.email,
//       subject: "Your password reset token (valid for 10 min)",
//       message,
//     });

//     res.status(200).json({
//       status: "success",
//       message: "Token sent to email!",
//     });
//   } catch (err) {
//     // user.passwordResetToken = undefined;
//     // user.passwordResetExpires = undefined;
//     // await user.save({ validateBeforeSave: false });
//     // return next(
//     //   new AppError("There was an error sending the email. Try again later!"),
//     //   500
//     // );
//   }
// };

const createSendToken = (user: any, statusCode: any, res: any) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_COOKIE_EXPIRES_IN!) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: false,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

// export const resetPassword = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   // 1) Get user based on the token
//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(req.params.token)
//     .digest("hex");

//   const user = await Users.findOne({
//     passwordResetToken: hashedToken,
//     passwordResetExpires: { $gt: Date.now() },
//   });

//   // 2) If token has not expired, and there is user, set the new password
//   if (!user) {
//     return next(new AppError("Token is invalid or has expired", 400));
//   }
//   user.password = req.body.password;
//   user.pwdConfirm = req.body.passwordConfirm;
//   user.passwordResetToken = undefined;
//   user.passwordResetExpires = undefined;
//   await user.save();

//   // 3) Update changedPasswordAt property for the user
//   // 4) Log the user in, send JWT
//   createSendToken(user, 200, res);
// };

export const logout = (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("accessToken");
  res.clearCookie("logged_in");
  res.clearCookie("connect.sid");
  res.status(200).json({
    status: "success",
    statusCode: 200,
  });
};
