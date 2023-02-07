import jwt, { SignOptions } from "jsonwebtoken";
import config from "config";
import * as dotenv from "dotenv";
import { token } from "morgan";
import { string } from "zod";

dotenv.config();
const privateKeys = "skilldataEirisappprivatekey";
export const signJwt = (payload: Object, options: SignOptions = {}) => {
  //console.log(process.env.ACCESS_TOKEN_PRIVATE_KEY);
  const privateKey = Buffer.from(
    /*process.env.ACCESS_TOKEN_PRIVATE_KEY!*/ privateKeys,
    "base64"
  ).toString("ascii");
  return jwt.sign(payload, privateKeys);
};

export const verifyJwt = (token: string) => {
  try {
    // const publicKey = Buffer.from(
    //   config.get<string>("accessTokenPublicKey"),
    //   "base64"
    // ).toString("ascii");
    return jwt.verify(token, privateKeys);
  } catch (error) {
    return null;
  }
};
