import * as notesRepository from "../repositories/notesRepository";

export async function addNew(note: Omit<notesRepository.INote, "id">) {
  try {
    await notesRepository.insert(note);
  } catch (err: Error | any) {
    if (err.code === "P2002") {
      throw {
        code: "TitleCreated",
        message: "Error: you already created a note with this title",
      };
    }
    throw { code: "ServerProblem", message: err };
  }
}

export async function getAll(userId: string) {
  try {
    const notes = await notesRepository.getAll(userId);

    return notes;
  } catch (err: Error | any) {
    throw { code: "ServerProblem", message: err };
  }
}

export async function deleteOne(id: string, userId: string) {
  try {
    const notes = await notesRepository.getAll(userId);
    let matchId = false;

    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === id) {
        matchId = true;
        break;
      }
    }

    if (!matchId) {
      throw {
        code: "NotFound",
        message: "Error: could not find note to delete",
      };
    }

    await notesRepository.deleteOne(id);
  } catch (err: Error | any) {
    if (err.code) {
      throw err;
    }
    throw { code: "ServerProblem", message: err };
  }
}
