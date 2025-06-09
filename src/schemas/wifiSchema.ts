import joi from "joi";

import { IWifi } from "../repositories/wifiRepository";

export const wifiSchema = joi.object<Omit<IWifi, "id, userId">>({
  title: joi.string().required(),
  name: joi.string().required(),
  password: joi.string().required(),
});
