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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Students = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bankDetailSchema = new mongoose_1.Schema({
    bankAccountNo: { type: String },
    bankName: { type: String },
    bankIFSCCode: { type: String },
});
const academicDetailsSchema = new mongoose_1.Schema({
    sslcRegNo: { type: String, required: true },
    pucRegNo: { type: String },
    diplomaRegNo: { type: String },
    sslcResult: { type: String },
    pucResult: { type: String },
    diplomaResult: { type: String },
    quotaType: { type: String },
    quotaTypeCode: { type: Number },
    entranceType: { type: String },
    entranceTypeCode: { type: Number },
});
const contactSchema = new mongoose_1.Schema({
    address: { type: String, required: true },
    state: { type: String, required: true },
    stateRef: { type: Number, required: true },
    district: { type: String, required: true },
    districtRef: { type: Number, required: true },
    city: { type: String, required: true },
    zipCode: { type: Number, required: true },
});
const studentSchema = new mongoose_1.Schema({
    studentId: { type: Number },
    firstName: { type: String, required: true, maxlength: 50 },
    middleName: { type: String, maxlength: 50 },
    lastName: { type: String, required: true, maxlength: 50 },
    isActive: { type: Boolean, required: true },
    gender: { type: String, required: true },
    genderCode: { type: Number, required: true },
    dob: { type: Date },
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
    academicDetails: { type: academicDetailsSchema },
    bankDetails: { type: bankDetailSchema },
    // state: { type: String, required: true },
    // stateRef: { type: Number, required: true },
    // district: { type: String, required: true },
    // districtRef: { type: Number, required: true },
    // city: { type: String, required: true },
    // zipCode: { type: Number, required: true },
}, {
    collection: "students",
    versionKey: false,
});
const Students = mongoose_1.default.model("Students", studentSchema);
exports.Students = Students;
