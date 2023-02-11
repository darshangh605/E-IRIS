"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = __importStar(require("mongoose"));
//import { Schema } from "zod";
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const contactSchema = new mongoose_1.Schema({
    address: { type: String, required: true },
    state: { type: String, required: true },
    stateRef: { type: Number, required: true },
    district: { type: String, required: true },
    districtRef: { type: Number, required: true },
    city: { type: String, required: true },
    zipCode: { type: Number, required: true },
});
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true, maxlength: 50 },
    middleName: { type: String, maxlength: 50 },
    lastName: { type: String, required: true, maxlength: 50 },
    userName: { type: String, required: true, unique: true, maxlength: 50 },
    password: { type: String, required: true, maxlength: 100 },
    isActive: { type: Boolean, required: true },
    role: { type: String, required: true },
    roleCode: { type: String, required: true },
    contactNo: { type: Number, required: true, maxlength: 10 },
    email: { type: String, unique: true, required: true },
    lastLoggedIn: { type: Date },
    title: { type: String, required: true },
    titleCode: { type: Number, required: true },
    gender: { type: String, required: true },
    genderCode: { type: Number, required: true },
    dob: { type: Date },
    maritalStatus: { type: String, required: true },
    maritalStatusCode: { type: Number, required: true },
    qualification: { type: String, required: true },
    qualificationCode: { type: Number, required: true },
    department: { type: String, required: true },
    departmentCode: { type: Number, required: true },
    nationality: { type: String, required: true },
    religion: { type: String, required: true },
    religionCode: { type: Number, required: true },
    socialCategory: { type: String, required: true },
    socialCategoryCode: { type: Number, required: true },
    obcSubCategory: { type: String },
    obcSubCategoryCode: { type: Number },
    residentialAddress: { type: contactSchema, required: true },
    permanentAddress: { type: contactSchema, required: true },
}, {
    collection: "users",
    versionKey: false,
});
// userSchema.pre("save", async function (next) {
//   // Only run this function if password was actually modified
//   //if (!this.isModified("password")) return next();
//   // Hash the password with cost of 12
//   this.password = await bcrypt.hash(this.password, 12);
//   // Delete passwordConfirm field
//   this.pwdConfirm = undefined;
//   next();
// });
userSchema.methods.comparePasswords = function (hashedPassword, candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(candidatePassword, hashedPassword);
    });
};
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto_1.default.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto_1.default
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    console.log({ resetToken }, this.passwordResetToken);
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
};
const Users = mongoose_1.default.model("Users", userSchema);
exports.Users = Users;
