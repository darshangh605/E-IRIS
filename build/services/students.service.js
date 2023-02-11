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
exports.generateStudentId = exports.addStudents = void 0;
const students_model_1 = require("../models/students.model");
const addStudents = (studentObj) => __awaiter(void 0, void 0, void 0, function* () {
    const student = Object.assign({}, studentObj);
    yield students_model_1.Students.create(student);
});
exports.addStudents = addStudents;
const generateStudentId = () => __awaiter(void 0, void 0, void 0, function* () {
    const sid = Math.floor(Math.random() * 90000) + 10000;
    const student = yield students_model_1.Students.find({ studentId: sid });
    if (!student) {
        return sid;
    }
    else {
        (0, exports.generateStudentId)();
    }
});
exports.generateStudentId = generateStudentId;
