import { Request, Response } from "express";

import handleError from "../services/errorServices";
import * as credentialsServices from "../services/credentialsServices";

export async function createCredentials(req: Request, res: Response) {
  const { id: userId } = res.locals.user;
  const credentials = req.body;

  try {
    await credentialsServices.addNew({
      ...credentials,
      userId,
    });

    res.status(201).send({
      message: "Credentials created successfully"
    });
  } catch (err: Error | any) {
    const statusCode = handleError(err.code);
    res.status(statusCode).send({
      errorMessage: "On createCredentials: " + err.message
    });
  }
}

export async function getAllCredentials(req: Request, res: Response) {
  const { id: userId } = res.locals.user;

  try {
    const credentials = await credentialsServices.getAll(userId);

    res.status(200).send(credentials);
  } catch (err: Error | any) {
    const statusCode = handleError(err.code);
    res.status(statusCode).send({
      errorMessage: "On getAllCredentials: " + err.message
    });
  }
}

export async function deleteCredentials(req: Request, res: Response) {
  const { id } = req.params;
  const { id: userId } = res.locals.user;

  try {
    await credentialsServices.deleteOne(id, userId);

    res.status(204).send({
      message: "Credentials deleted successfully"
    });
  } catch (err: Error | any) {
    const statusCode = handleError(err.code);
    res.status(statusCode).send({
      errorMessage: "On deleteCredentials: " + err.message
    });
  }
}
