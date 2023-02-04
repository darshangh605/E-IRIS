import Joi from "joi";
import { IContactDetails, IUsers } from "../models/users.model";

export const userValidator = {
  signUp: {
    body: Joi.object<IUsers>({
      firstName: Joi.string()
        .trim()
        .required()
        .min(3)
        .max(50)
        .error(() => "First Name is required"),
      middleName: Joi.string().max(50),

      lastName: Joi.string()
        .required()
        .min(1)
        .max(50)
        .error(() => "Last Name is required"),
      password: Joi.string()
        .required()
        .max(100)
        .error(() => "Password is required"),

      role: Joi.string()
        .required()
        .error(() => "Role is required"),
      roleCode: Joi.string()
        .required()
        .error(() => "Role code is required"),
      contactNo: Joi.number()
        .required()
        .max(10)
        .error(() => "Contact No. is required"),
      email: Joi.string()
        .email()
        .error(() => "email is required"),
      lastLoggedIn: Joi.date(),
      title: Joi.string()
        .required()
        .error(() => "Title is required"),
      titleCode: Joi.number()
        .required()
        .error(() => "Title code is required"),
      gender: Joi.string()
        .required()
        .error(() => "Gender is required"),
      genderCode: Joi.number()
        .required()
        .error(() => "Gender code is required"),
      dob: Joi.date().error(() => "dob is required"),
      maritalStatus: Joi.string()
        .required()
        .error(() => "Marital Status is required"),
      maritalStatusCode: Joi.number()
        .required()
        .error(() => "Marital Status code is required"),
      qualification: Joi.string()
        .required()
        .error(() => "Qualification is required"),
      qualificationCode: Joi.number()
        .required()
        .error(() => "Qualification code is required"),
      department: Joi.string()
        .required()
        .error(() => "Department is required"),
      departmentCode: Joi.number()
        .required()
        .error(() => "Department code is required"),
      nationality: Joi.string()
        .required()
        .error(() => "Nationality code is required"),
      religion: Joi.string()
        .required()
        .error(() => "Religion code is required"),
      religionCode: Joi.number()
        .required()
        .error(() => "Religion code is required"),
      socialCategory: Joi.string()
        .required()
        .error(() => "Social Category is required"),
      socialCategoryCode: Joi.number()
        .required()
        .error(() => "Social Category code is required"),
      obcSubCategory: Joi.string(),

      obcSubCategoryCode: Joi.number(),

      residentialAddress: Joi.object<IContactDetails>({
        state: Joi.string().required(),
        stateRef: Joi.number().required(),
        district: Joi.string().required(),
        districtRef: Joi.string().required(),
        city: Joi.string().required(),
        zipCode: Joi.number().required(),
      }),
      permanentAddress: Joi.object<IContactDetails>({
        state: Joi.string().required(),
        stateRef: Joi.number().required(),
        district: Joi.string().required(),
        districtRef: Joi.string().required(),
        city: Joi.string().required(),
        zipCode: Joi.number().required(),
      }),
    }),
  },
};
