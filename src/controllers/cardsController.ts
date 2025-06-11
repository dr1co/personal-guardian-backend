import { Request, Response } from "express";

import handleError from "../services/errorServices";
import * as cardsServices from "../services/cardsServices";

export async function createCard(req: Request, res: Response) {
  const { id: userId } = res.locals.user;
  const card = req.body;

  try {
    await cardsServices.addNew({ ...card, userId });

    res.status(201).send({
      message: "Created card successfully"
    });
  } catch (err: Error | any) {
    const statusCode = handleError(err.code);
    res.status(statusCode).send({
      errorMessage: "On createCard: " + err.message
    });
  }
}

export async function getAllCards(req: Request, res: Response) {
  const { id: userId } = res.locals.user;

  try {
    const cards = await cardsServices.getAll(userId);

    res.status(200).send(cards);
  } catch (err: Error | any) {
    const statusCode = handleError(err.code);
    res.status(statusCode).send({
      errorMessage: "On getAllCards: " + err.message
    });
  }
}

export async function deleteCard(req: Request, res: Response) {
  const { id: userId } = res.locals.user;
  const { id } = req.params;

  try {
    const cards = await cardsServices.deleteOne(id, userId);

    res.status(204).send({
      message: "Card deleted successfully"
    });
  } catch (err: Error | any) {
    const statusCode = handleError(err.code);
    res.status(statusCode).send({
      errorMessage: "On deleteCard: " + err.message
    });
  }
}
