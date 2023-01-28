import { NextFunction, Request, Response } from "express";
import { findAllUsers } from "../services/user.service";
import {
  ConsolidatedGeneralMaster,
  IconsolidatedGeneralMaster,
} from "../models/consolidatedGeneralMaster.model";
import {
  studentEnrollMasters,
  userRegistrationMasters,
} from "../utils/constants";
import { StatusCodes } from "http-status-codes";
export const getMeHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllUsersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await findAllUsers();

    res.status(200).json({
      status: "success",
      result: users.length,
      data: {
        users,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getDataToLoadScreen = async (req: Request, res: Response) => {
  try {
    const screenName = req.body?.screenName;
    let filter = {};
    if (screenName === "userRegistration") {
      filter = {
        description: {
          $in: userRegistrationMasters,
        },
      };
    } else if (screenName === "studentEnrollment") {
      filter = {
        description: {
          $in: studentEnrollMasters,
        },
      };
    }
    const masterData = await ConsolidatedGeneralMaster.find(filter);
    res.status(200).json({
      status: StatusCodes.OK,
      //result: users.length,
      data: {
        masterData,
      },
    });
  } catch (error) {
    res.json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Something went wrong, please try again",
    });
  }
};
