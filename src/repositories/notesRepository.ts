import cuid from "cuid";

import client from "../databases/prisma";

export interface INote {
  id: string;
  title: string;
  note: string;
  userId: string;
}

export async function insert(noteObject: Omit<INote, "id">) {
  const { title, note, userId } = noteObject;

  const id = cuid();

  await client.notes.create({
    data: {
      id,
      title,
      note,
      userId,
    },
  });
}

export async function getAll(userId: string) {
  return await client.notes.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      title: true,
      note: true,
    },
  });
}

export async function deleteOne(id: string) {
  await client.notes.delete({
    where: {
      id,
    },
  });
}
