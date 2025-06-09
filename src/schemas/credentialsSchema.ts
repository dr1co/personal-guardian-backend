import joi from "joi";

import { ICredentials } from "../repositories/credentialsRepository";

export const credentialsSchema = joi.object<Omit<ICredentials, "id, userId">>({
  title: joi.string().required(),
  url: joi.string().uri().required(),
  username: joi.string().required(),
  password: joi.string().required(),
});
