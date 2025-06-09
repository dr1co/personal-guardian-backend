import cuid from "cuid";

import client from "../databases/prisma";

export interface ICredentials {
  id: string;
  title: string;
  url: string;
  username: string;
  password: string;
  userId: string;
}

export async function insert(credentials: Omit<ICredentials, "id">) {
  const { title, url, username, password, userId } = credentials;

  const id = cuid();

  await client.credentials.create({
    data: {
      id,
      title,
      url,
      username,
      password,
      userId,
    },
  });
}

export async function getAll(userId: string) {
  return await client.credentials.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      title: true,
      url: true,
      username: true,
      password: true,
    },
  });
}

export async function deleteOne(id: string) {
  await client.credentials.delete({
    where: {
      id,
    },
  });
}
