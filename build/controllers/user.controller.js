"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataToLoadScreen = exports.getAllUsersHandler = exports.getMeHandler = void 0;
const user_service_1 = require("../services/user.service");
const consolidatedGeneralMaster_model_1 = require("../models/consolidatedGeneralMaster.model");
const constants_1 = require("../utils/constants");
const http_status_codes_1 = require("http-status-codes");
const statesMaster_1 = require("../models/statesMaster");
const getMeHandler = (req, res, next) => {
    try {
        const user = res.locals.user;
        res.status(200).json({
            status: "success",
            data: {
                user,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getMeHandler = getMeHandler;
const getAllUsersHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_service_1.findAllUsers)();
        res.status(200).json({
            status: "success",
            result: users.length,
            data: {
                users,
            },
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllUsersHandler = getAllUsersHandler;
const getDataToLoadScreen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const screenName = (_a = req.body) === null || _a === void 0 ? void 0 : _a.screenName;
        let filter = {};
        if (screenName === "userRegistration") {
            filter = {
                description: {
                    $in: constants_1.userRegistrationMasters,
                },
            };
        }
        else if (screenName === "studentEnrollment") {
            filter = {
                description: {
                    $in: constants_1.studentEnrollMasters,
                },
            };
        }
        const masterData = yield consolidatedGeneralMaster_model_1.ConsolidatedGeneralMaster.find(filter);
        let statesAndDistrictsData = yield statesMaster_1.StatesMaster.find({
            type: { $in: ["state", "district"] },
        });
        let statesAndDistricts = [];
        if (statesAndDistrictsData) {
            statesAndDistrictsData.forEach((x) => {
                if (x.type === "state") {
                    statesAndDistricts.push({
                        value: x.value,
                        valueRef: x.valueRef,
                        type: x.type,
                        districts: statesAndDistrictsData.filter((a) => a.mapRef === x.valueRef),
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
                maritalStatus: masterData.filter((x) => x.description === "maritalStatus"),
                qualification: masterData.filter((x) => x.description === "qualification"),
                nationality: masterData.filter((x) => x.description === "nationality"),
                religion: masterData.filter((x) => x.description === "religion"),
                socialcategory: masterData.filter((x) => x.description === "socialcategory"),
                obcsubcategory: masterData.filter((x) => x.description === "obcsubcategory"),
                states: statesAndDistricts,
                semester: masterData.filter((x) => x.description === "semester"),
            };
            res.status(200).json({
                status: http_status_codes_1.StatusCodes.OK,
                //result: users.length,
                data: responseObj,
            });
        }
    }
    catch (error) {
        res.json({
            status: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Something went wrong, please try again",
        });
    }
});
exports.getDataToLoadScreen = getDataToLoadScreen;
