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
exports.addStudent = void 0;
const http_status_codes_1 = require("http-status-codes");
const students_service_1 = require("../services/students.service");
const addStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqObj = req.body;
    try {
        if (reqObj) {
            //const sid =  generateStudentId;
            const student = Object.assign(Object.assign({}, reqObj), { 
                //studentId: sid,
                isActive: true });
            yield (0, students_service_1.addStudents)(student);
            res.status(200).json({
                status: http_status_codes_1.StatusCodes.OK,
                message: "Student added successfully.",
            });
        }
    }
    catch (err) {
        res.status(500).json({
            status: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Something went wrong from our side",
            error: err,
        });
    }
});
exports.addStudent = addStudent;
