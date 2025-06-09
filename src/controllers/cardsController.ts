import { Request, Response } from "express";

import handleError from "../services/errorServices";
import * as cardsServices from "../services/cardsServices";

export async function createCard(req: Request, res: Response) {
  const { id: userId } = res.locals.user;
  const card = req.body;

  try {
    await cardsServices.addNew({ ...card, userId });

    res.status(201).send("Created card successfully");
  } catch (err: Error | any) {
    const statusCode = handleError(err.code);
    res.status(statusCode).send("On createCard: " + err.message);
  }
}

export async function getAllCards(req: Request, res: Response) {
  const { id: userId } = res.locals.user;

  try {
    const cards = await cardsServices.getAll(userId);

    res.status(200).send(cards);
  } catch (err: Error | any) {
    const statusCode = handleError(err.code);
    res.status(statusCode).send("On getAllCards: " + err.message);
  }
}

export async function deleteCard(req: Request, res: Response) {
  const { id: userId } = res.locals.user;
  const { id } = req.params;

  try {
    const cards = await cardsServices.deleteOne(id, userId);

    res.status(204).send("Card deleted successfully");
  } catch (err: Error | any) {
    const statusCode = handleError(err.code);
    res.status(statusCode).send("On deleteCard: " + err.message);
  }
}
