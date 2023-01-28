import { FilterQuery, QueryOptions } from "mongoose";
import config from "config";
import { Users, IUsers } from "../models/users.model";
import { signJwt } from "../utils/jwt";
import { IAddStudents } from "../types/requestTypes";
import { IStudents, Students } from "../models/students.model";

const addStudents = async (studentObj: IAddStudents) => {
  const student: IStudents = {
    ...studentObj,
  };
  await Students.create(student);
};
