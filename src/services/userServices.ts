import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import * as userRepository from "../repositories/userRepository";
import * as encryption from "./encryptionServices";

dotenv.config();
const jwtKey = process.env.JWT_SECRET || "drivenpass";

export async function addNew(user: Omit<userRepository.IUser, "id">) {
  try {
    const findUser = await userRepository.findByEmail(user.email);

    if (findUser) {
      throw {
        code: "RegisteredUser",
        message: "Error: user already registered",
      };
    }

    const newPassword = encryption.oneWayEncrypt(user.password);

    await userRepository.insert({ ...user, password: newPassword });
  } catch (err: Error | any) {
    if (err.code) {
      throw err;
    } else {
      throw { code: "ServerProblem", message: err };
    }
  }
}

export async function login(user: Omit<userRepository.IUser, "id">) {
  try {
    const findUser = await userRepository.findByEmail(user.email);

    if (!findUser) {
      throw {
        code: "IncorrectCredentials",
        message: "Error: email or password are invalid",
      };
    }

    const validatePassword = encryption.validateOneWay(
      user.password,
      findUser.password
    );

    if (!validatePassword) {
      throw {
        code: "IncorrectCredentials",
        message: "Error: email or password are invalid",
      };
    }

    const week = 60 * 60 * 24 * 7;
    const token = jwt.sign(findUser, jwtKey, { expiresIn: week });

    return token;
  } catch (err: Error | any) {
    if (err.code) {
      throw err;
    } else {
      throw { code: "ServerProblem", message: err };
    }
  }
}
