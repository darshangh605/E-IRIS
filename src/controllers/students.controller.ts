import { NextFunction, Request, Response } from "express";
import {
  ConsolidatedGeneralMaster,
  IconsolidatedGeneralMaster,
} from "../models/consolidatedGeneralMaster.model";
import {
  studentEnrollMasters,
  userRegistrationMasters,
} from "../utils/constants";
import { StatusCodes } from "http-status-codes";
