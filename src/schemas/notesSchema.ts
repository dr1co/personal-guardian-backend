import joi from "joi";

import { INote } from "../repositories/notesRepository";

export const notesSchema = joi.object<Omit<INote, "id, userId">>({
  title: joi.string().required().max(50),
  note: joi.string().required().max(1000),
});
