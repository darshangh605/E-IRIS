"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const privateKeys = "skilldataEirisappprivatekey";
const signJwt = (payload, options = {}) => {
    //console.log(process.env.ACCESS_TOKEN_PRIVATE_KEY);
    const privateKey = Buffer.from(
    /*process.env.ACCESS_TOKEN_PRIVATE_KEY!*/ privateKeys, "base64").toString("ascii");
    return jsonwebtoken_1.default.sign(payload, privateKeys);
};
exports.signJwt = signJwt;
const verifyJwt = (token) => {
    try {
        // const publicKey = Buffer.from(
        //   config.get<string>("accessTokenPublicKey"),
        //   "base64"
        // ).toString("ascii");
        return jsonwebtoken_1.default.verify(token, privateKeys);
    }
    catch (error) {
        return null;
    }
};
exports.verifyJwt = verifyJwt;
