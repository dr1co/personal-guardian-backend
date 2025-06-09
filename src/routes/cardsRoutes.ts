import express from "express";

import validateToken from "../middlewares/validateTokenMiddleware";
import validateSchema from "../middlewares/validateSchemaMiddleware";
import { cardsSchema } from "../schemas/cardsSchema";
import {
  createCard,
  getAllCards,
  deleteCard,
} from "../controllers/cardsController";

const cardsRouter = express.Router();

cardsRouter.post(
  "/cards",
  validateToken,
  validateSchema(cardsSchema),
  createCard
);
cardsRouter.get("/cards", validateToken, getAllCards);
cardsRouter.delete("/cards/:id", validateToken, deleteCard);

export default cardsRouter;
