import { Request, Response } from "express";

import handleError from "../services/errorServices";
import * as userServices from "../services/userServices";

export async function createUser(req: Request, res: Response) {
  const user = req.body;

  try {
    await userServices.addNew(user);

    res.status(201).send({
      message: "User registered successfully"
    });
  } catch (err: Error | any) {
    const statusCode = handleError(err.code);
    res.status(statusCode).send({
      errorMessage: "On createUser: " + err.message
    });
  }
}

export async function loginUser(req: Request, res: Response) {
  const user = req.body;

  try {
    const newToken = await userServices.login(user);

    res.status(200).send({ token: newToken });
  } catch (err: Error | any) {
    const statusCode = handleError(err.code);
    res.status(statusCode).send({
      errorMessage: "On loginUser: " + err.message
    });
  }
}
