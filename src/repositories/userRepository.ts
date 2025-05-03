import cuid from "cuid";

import client from "../databases/prisma";

export interface IUser {
  id: string;
  email: string;
  password: string;
}

export async function findByEmail(email: string) {
  return await client.users.findUnique({
    where: {
      email,
    },
  });
}

export async function insert(newUser: Omit<IUser, "id">) {
  const { email, password } = newUser;

  const id = cuid();

  await client.users.create({
    data: {
      id,
      email,
      password,
    },
  });
}
