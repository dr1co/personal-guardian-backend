import express from "express";

import validateToken from "../middlewares/validateTokenMiddleware";
import validateSchema from "../middlewares/validateSchemaMiddleware";
import { notesSchema } from "../schemas/notesSchema";
import {
  createNote,
  getAllNotes,
  deleteNote,
} from "../controllers/notesController";

const notesRouter = express.Router();

notesRouter.post(
  "/notes",
  validateToken,
  validateSchema(notesSchema),
  createNote
);
notesRouter.get("/notes", validateToken, getAllNotes);
notesRouter.delete("/notes/:id", validateToken, deleteNote);

export default notesRouter;
