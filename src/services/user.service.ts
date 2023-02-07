import { FilterQuery, QueryOptions } from "mongoose";
import config from "config";
import { Users, IUsers } from "../models/users.model";
import { signJwt } from "../utils/jwt";

import redisClient from "../utils/connectRedis";

// CreateUser service
export const createUser = async (input: IUsers) => {
  const user = await Users.create(input);
  return user;
  //return omit(user.toJSON(), excludedFields);
};

// Find User by Id
export const findUserById = async (id: string) => {
  const user = await Users.findById(id).lean();
  return user;
};

// Find All users
export const findAllUsers = async () => {
  return await Users.find();
};

// Find one user by any fields
export const findUser = async (
  query: FilterQuery<IUsers>,
  options: QueryOptions = {}
) => {
  const asd = await Users.findOne(query); //.select("+password");
  return asd;
};

// Sign Token
export const signToken = async (user: IUsers) => {
  // Sign the access token
  const access_token = signJwt(
    { sub: user._id },
    {
      expiresIn: `${parseInt("25")}m`,
    }
  );

  //Create a Session
  //redisClient.set(user?._id!.toString(), JSON.stringify(user));
  //   // Return access token
  return { access_token };
};
