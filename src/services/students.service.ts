import { FilterQuery, QueryOptions } from "mongoose";
import config from "config";
import { Users, IUsers } from "../models/users.model";
import { signJwt } from "../utils/jwt";
import { IAddStudents } from "../types/requestTypes";
import { IStudents, Students } from "../models/students.model";

export const addStudents = async (studentObj: IAddStudents) => {
  const student: IStudents = {
    ...studentObj,
  };
  await Students.create(student);
};

export const generateStudentId = async () => {
  const sid = Math.floor(Math.random() * 90000) + 10000;
  const student = await Students.find({ studentId: sid });
  if (!student) {
    return sid;
  } else {
    generateStudentId();
  }
};
