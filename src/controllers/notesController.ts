import { Request, Response } from "express";

import handleError from "../services/errorServices";
import * as notesServices from "../services/notesServices";

export async function createNote(req: Request, res: Response) {
  const { id: userId } = res.locals.user;
  const note = req.body;

  try {
    await notesServices.addNew({ ...note, userId });

    res.status(201).send({
      message: "Note created successfully"
    });
  } catch (err: Error | any) {
    const statusCode = handleError(err.code);
    res.status(statusCode).send({
      errorMessage: "On createNote: " + err.message
    });
  }
}

export async function getAllNotes(req: Request, res: Response) {
  const { id: userId } = res.locals.user;

  try {
    const notes = await notesServices.getAll(userId);

    res.status(200).send(notes);
  } catch (err: Error | any) {
    const statusCode = handleError(err.code);
    res.status(statusCode).send({
      errorMessage: "On getAllNotes: " + err.message
    });
  }
}

export async function deleteNote(req: Request, res: Response) {
  const { id } = req.params;
  const { id: userId } = res.locals.user;

  try {
    await notesServices.deleteOne(id, userId);

    res.status(204).send({
      message: "Note deleted successfully"
    });
  } catch (err: Error | any) {
    const statusCode = handleError(err.code);
    res.status(statusCode).send({
      errorMessage: "On deleteNote: " + err.message
    });
  }
}
