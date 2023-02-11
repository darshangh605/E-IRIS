"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userValidator = {
    signUp: {
        body: joi_1.default.object({
            firstName: joi_1.default.string()
                .trim()
                .required()
                .min(3)
                .max(50)
                .error(() => "First Name is required"),
            middleName: joi_1.default.string().max(50),
            lastName: joi_1.default.string()
                .required()
                .min(1)
                .max(50)
                .error(() => "Last Name is required"),
            password: joi_1.default.string()
                .required()
                .max(100)
                .error(() => "Password is required"),
            role: joi_1.default.string()
                .required()
                .error(() => "Role is required"),
            roleCode: joi_1.default.string()
                .required()
                .error(() => "Role code is required"),
            contactNo: joi_1.default.number()
                .required()
                .max(10)
                .error(() => "Contact No. is required"),
            email: joi_1.default.string()
                .email()
                .error(() => "email is required"),
            lastLoggedIn: joi_1.default.date(),
            title: joi_1.default.string()
                .required()
                .error(() => "Title is required"),
            titleCode: joi_1.default.number()
                .required()
                .error(() => "Title code is required"),
            gender: joi_1.default.string()
                .required()
                .error(() => "Gender is required"),
            genderCode: joi_1.default.number()
                .required()
                .error(() => "Gender code is required"),
            dob: joi_1.default.date().error(() => "dob is required"),
            maritalStatus: joi_1.default.string()
                .required()
                .error(() => "Marital Status is required"),
            maritalStatusCode: joi_1.default.number()
                .required()
                .error(() => "Marital Status code is required"),
            qualification: joi_1.default.string()
                .required()
                .error(() => "Qualification is required"),
            qualificationCode: joi_1.default.number()
                .required()
                .error(() => "Qualification code is required"),
            department: joi_1.default.string()
                .required()
                .error(() => "Department is required"),
            departmentCode: joi_1.default.number()
                .required()
                .error(() => "Department code is required"),
            nationality: joi_1.default.string()
                .required()
                .error(() => "Nationality code is required"),
            religion: joi_1.default.string()
                .required()
                .error(() => "Religion code is required"),
            religionCode: joi_1.default.number()
                .required()
                .error(() => "Religion code is required"),
            socialCategory: joi_1.default.string()
                .required()
                .error(() => "Social Category is required"),
            socialCategoryCode: joi_1.default.number()
                .required()
                .error(() => "Social Category code is required"),
            obcSubCategory: joi_1.default.string(),
            obcSubCategoryCode: joi_1.default.number(),
            residentialAddress: joi_1.default.object({
                state: joi_1.default.string().required(),
                stateRef: joi_1.default.number().required(),
                district: joi_1.default.string().required(),
                districtRef: joi_1.default.string().required(),
                city: joi_1.default.string().required(),
                zipCode: joi_1.default.number().required(),
            }),
            permanentAddress: joi_1.default.object({
                state: joi_1.default.string().required(),
                stateRef: joi_1.default.number().required(),
                district: joi_1.default.string().required(),
                districtRef: joi_1.default.string().required(),
                city: joi_1.default.string().required(),
                zipCode: joi_1.default.number().required(),
            }),
        }),
    },
};
