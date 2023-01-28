import jwt, { SignOptions } from "jsonwebtoken";
import config from "config";
import * as dotenv from "dotenv";
import { token } from "morgan";
import { string } from "zod";

dotenv.config();
export const signJwt = (payload: Object, options: SignOptions = {}) => {
  console.log(process.env.ACCESS_TOKEN_PRIVATE_KEY);
  const privateKey = Buffer.from(
    process.env.ACCESS_TOKEN_PRIVATE_KEY,
    "base64"
  ).toString("ascii");
  return jwt.sign(payload, process.env.ACCESS_TOKEN_PRIVATE_KEY);
};

export const verifyJwt = (token: string) => {
  try {
    // const publicKey = Buffer.from(
    //   config.get<string>("accessTokenPublicKey"),
    //   "base64"
    // ).toString("ascii");
    return jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
  } catch (error) {
    return null;
  }
};
