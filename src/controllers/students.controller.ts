import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IAddStudents } from "../types/requestTypes";
import { IStudents } from "../models/students.model";
import { addStudents, generateStudentId } from "../services/students.service";

export const addStudent = async (req: Request, res: Response) => {
  const reqObj = req.body as IAddStudents;
  try {
    if (reqObj) {
      //const sid =  generateStudentId;
      const student: IStudents = {
        ...reqObj,
        //studentId: sid,
        isActive: true,
      };
      await addStudents(student);
      res.status(200).json({
        status: StatusCodes.OK,
        message: "Student added successfully.",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Something went wrong from our side",
      error: err,
    });
  }
};
