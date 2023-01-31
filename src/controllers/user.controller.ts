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
import { IStatesMaster, StatesMaster } from "../models/statesMaster";
import { forEach } from "lodash";
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
    let statesAndDistrictsData = await StatesMaster.find({
      type: { $in: ["state", "district"] },
    });
    let statesAndDistricts: IStatesMaster[] = [];
    if (statesAndDistrictsData) {
      statesAndDistrictsData.forEach((x) => {
        if (x.type === "state") {
          statesAndDistricts.push({
            value: x.value,
            valueRef: x.valueRef,
            type: x.type,
            districts: statesAndDistrictsData.filter(
              (a) => a.mapRef === x.valueRef
            ),
          });
        }
      });
    }

    //const states =
    if (masterData) {
      const responseObj = {
        title: masterData.filter((x) => x.description === "title"),
        role: masterData.filter((x) => x.description === "role"),
        department: masterData.filter((x) => x.description === "department"),
        gender: masterData.filter((x) => x.description === "gender"),
        maritalStatus: masterData.filter(
          (x) => x.description === "maritalStatus"
        ),
        qualification: masterData.filter(
          (x) => x.description === "qualification"
        ),
        nationality: masterData.filter((x) => x.description === "nationality"),
        religion: masterData.filter((x) => x.description === "religion"),
        socialcategory: masterData.filter(
          (x) => x.description === "socialcategory"
        ),
        obcsubcategory: masterData.filter(
          (x) => x.description === "obcsubcategory"
        ),
        states: statesAndDistricts,
      };
      res.status(200).json({
        status: StatusCodes.OK,
        //result: users.length,
        data: responseObj,
      });
    }
  } catch (error) {
    res.json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Something went wrong, please try again",
    });
  }
};
