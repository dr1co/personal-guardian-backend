import joi from "joi";

import { IUser } from "../repositories/userRepository";

export const userSchema = joi.object<Omit<IUser, "id">>({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
