import Joi from "joi";
import { IUsers } from "../models/users.model";

export const userValidator = {
  signUp: {
    body: Joi.object<IUsers>({
      firstName: Joi.string().trim().required().min(2).max(50),
      middleName: Joi.string().max(50),
      lastName: Joi.string().required().max(50),
      password: Joi.string().required().max(100),
      pwdConfirm: Joi.string().required().max(100),
      isActive: Joi.boolean().required(),
      roleVal: Joi.string().required(),
      roleRef: Joi.string().required(),
      contactNo: Joi.number().required().max(10),
      email: Joi.string().email(),
    }),
  },
};
