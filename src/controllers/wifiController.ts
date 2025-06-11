import { Request, Response } from "express";

import handleError from "../services/errorServices";
import * as wifiServices from "../services/wifiServices";

export async function createWifi(req: Request, res: Response) {
  const { id: userId } = res.locals.user;
  const wifi = req.body;

  try {
    await wifiServices.addNew({ ...wifi, userId });

    res.status(201).send({
      message: "Wifi created successfully"
    });
  } catch (err: Error | any) {
    const statusCode = handleError(err.code);
    res.status(statusCode).send({
      errorMessage: "On createWifi: " + err.message
    });
  }
}

export async function getAllWifis(req: Request, res: Response) {
  const { id: userId } = res.locals.user;

  try {
    const wifis = await wifiServices.getAll(userId);

    res.status(200).send(wifis);
  } catch (err: Error | any) {
    const statusCode = handleError(err.code);
    res.status(statusCode).send({
      errorMessage: "On getAllWifis: " + err.message
    });
  }
}

export async function deleteWifi(req: Request, res: Response) {
  const { id: userId } = res.locals.user;
  const { id } = req.params;

  try {
    await wifiServices.deleteOne(id, userId);

    res.status(204).send({
      message: "Wifi deleted successfully"
    });
  } catch (err: Error | any) {
    const statusCode = handleError(err.code);
    res.status(statusCode).send({
      errorMessage: "On deleteCredentials: " + err.message
    });
  }
}
