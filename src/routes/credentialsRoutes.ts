import express from "express";

import validateSchema from "../middlewares/validateSchemaMiddleware";
import validateToken from "../middlewares/validateTokenMiddleware";
import { credentialsSchema } from "../schemas/credentialsSchema";
import {
  createCredentials,
  getAllCredentials,
  deleteCredentials,
} from "../controllers/credentialsController";

const credentialsRouter = express.Router();

credentialsRouter.post(
  "/credentials",
  validateToken,
  validateSchema(credentialsSchema),
  createCredentials
);
credentialsRouter.get("/credentials", validateToken, getAllCredentials);
credentialsRouter.delete("/credentials/:id", validateToken, deleteCredentials);

export default credentialsRouter;
