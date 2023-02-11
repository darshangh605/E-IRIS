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
exports.signToken = exports.findUser = exports.findAllUsers = exports.findUserById = exports.createUser = void 0;
const users_model_1 = require("../models/users.model");
const jwt_1 = require("../utils/jwt");
// CreateUser service
const createUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.Users.create(input);
    return user;
    //return omit(user.toJSON(), excludedFields);
});
exports.createUser = createUser;
// Find User by Id
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.Users.findById(id).lean();
    return user;
});
exports.findUserById = findUserById;
// Find All users
const findAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield users_model_1.Users.find();
});
exports.findAllUsers = findAllUsers;
// Find one user by any fields
const findUser = (query, options = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const asd = yield users_model_1.Users.findOne(query); //.select("+password");
    return asd;
});
exports.findUser = findUser;
// Sign Token
const signToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // Sign the access token
    const access_token = (0, jwt_1.signJwt)({ sub: user._id }, {
        expiresIn: `${parseInt("25")}m`,
    });
    //Create a Session
    //redisClient.set(user?._id!.toString(), JSON.stringify(user));
    //   // Return access token
    return { access_token };
});
exports.signToken = signToken;
