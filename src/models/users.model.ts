import { number, string } from "joi";
import mongoose, { Schema, Document, Types } from "mongoose";
//import { Schema } from "zod";
import crypto from "crypto";
import bcrypt from "bcryptjs";
//import bc
//const bcrypt = require("bcryptjs");

interface IUsers {
  _id?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  userName: string;
  password: string | undefined;
  isActive: boolean;
  role: string;
  roleCode: string;
  contactNo: number;
  email: string;
  lastLoggedIn?: Date;
  title: string;
  titleCode: number;
  gender: string;
  genderCode: number;
  dob: Date;
  maritalStatus: string;
  maritalStatusCode: number;
  qualification: string;
  qualificationCode: number;
  department: string;
  departmentCode: number;
  nationality: string;
  religion: string;
  religionCode: number;
  socialCategory: string;
  socialCategoryCode: number;
  obcSubCategory?: string;
  obcSubCategoryCode?: number;
  residentialAddress: IContactDetails | undefined;
  permanentAddress: IContactDetails | undefined;
  // state: string;
  // stateRef: number;
  // district: string;
  // districtRef: number;
  // city: string;
  // zipCode: number;

  // comparePasswords(
  //   candidatePassword: string,
  //   hashedPassword: string
  // ): Promise<boolean>;
  // createPasswordResetToken(): Promise<string>;
  // passwordChangedAt?: Date | undefined;
  // passwordResetToken?: String | undefined;
  // passwordResetExpires?: Date | undefined;
}

interface IContactDetails {
  address: string;
  state: string;
  stateRef: number;
  district: string;
  districtRef: number;
  city: string;
  zipCode: number;
}

const contactSchema: Schema = new Schema<IContactDetails>({
  address: { type: String, required: true },
  state: { type: String, required: true },
  stateRef: { type: Number, required: true },
  district: { type: String, required: true },
  districtRef: { type: Number, required: true },
  city: { type: String, required: true },
  zipCode: { type: Number, required: true },
});

const userSchema: Schema = new Schema<IUsers>(
  {
    firstName: { type: String, required: true, maxlength: 50 },
    middleName: { type: String, maxlength: 50 },
    lastName: { type: String, required: true, maxlength: 50 },
    userName: { type: String, required: true, unique: true, maxlength: 50 },
    password: { type: String, required: true, maxlength: 20 },
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
    // state: { type: String, required: true },
    // stateRef: { type: Number, required: true },
    // district: { type: String, required: true },
    // districtRef: { type: Number, required: true },
    // city: { type: String, required: true },
    // zipCode: { type: Number, required: true },
    // passwordChangedAt: { type: Date },
    // passwordResetToken: { type: String },
    // passwordResetExpires: { type: Date },
  },
  {
    collection: "users",
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  //if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.pwdConfirm = undefined;
  next();
});
userSchema.methods.comparePasswords = async function (
  hashedPassword: string,
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const Users = mongoose.model<IUsers>("Users", userSchema);
export { Users, IUsers, IContactDetails };
