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
exports.logout = exports.loginHandler = exports.registerHandler = exports.excludedFields = void 0;
const user_service_1 = require("../services/user.service");
const http_status_codes_1 = require("http-status-codes");
// Exclude this fields from the response
exports.excludedFields = ["password"];
const expiresIn = "25";
// Cookie options
const accessTokenCookieOptions = {
    expires: new Date(Date.now() + parseInt(expiresIn) * 60 * 1000),
    maxAge: parseInt(expiresIn) * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
};
// Only set secure to true in production
if (process.env.NODE_ENV === "production")
    accessTokenCookieOptions.secure = true;
const registerHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = req.body;
    const userObj = {
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
        const user = yield (0, user_service_1.createUser)(userObj);
        user.password = undefined;
        res.status(201).json({
            status: "success",
            data: {
                user,
            },
        });
    }
    catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: http_status_codes_1.StatusCodes.CONFLICT,
                message: "Email already exist",
            });
        }
        next(err);
    }
});
exports.registerHandler = registerHandler;
const loginHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        // Get the user from the collection
        const user = yield (0, user_service_1.findUser)({ email: email });
        if (!user) {
            return res.status(200).json({
                status: http_status_codes_1.StatusCodes.NOT_FOUND,
                statusCode: "The User does not exists with this emailId",
            });
        }
        else if (!user.password || (user === null || user === void 0 ? void 0 : user.password) !== req.body.password) {
            return res.status(200).json({
                status: http_status_codes_1.StatusCodes.UNAUTHORIZED,
                statusCode: "Invalid credentials",
            });
        }
        // Check if user exist and password is correct
        // Create an Access Token
        const { access_token } = yield (0, user_service_1.signToken)(user);
        res.cookie("accessToken", access_token, accessTokenCookieOptions);
        res.cookie("logged_in", true, Object.assign(Object.assign({}, accessTokenCookieOptions), { httpOnly: false }));
        user.password = undefined;
        // Send Access Token
        res.status(200).json({
            status: http_status_codes_1.StatusCodes.OK,
            statusCode: "Success",
            access_token,
            userDetails: user,
        });
    }
    catch (err) {
        res.status(500).json({
            status: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            statusCode: "Something went wrong from our side",
            error: err,
        });
    }
});
exports.loginHandler = loginHandler;
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
const createSendToken = (user, statusCode, res) => {
    const token = (0, user_service_1.signToken)(user._id);
    const cookieOptions = {
        expires: new Date(Date.now() +
            parseInt(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: false,
    };
    if (process.env.NODE_ENV === "production")
        cookieOptions.secure = true;
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
const logout = (req, res, next) => {
    res.clearCookie("accessToken");
    res.clearCookie("logged_in");
    res.clearCookie("connect.sid");
    res.status(200).json({
        status: "success",
        statusCode: 200,
    });
};
exports.logout = logout;
