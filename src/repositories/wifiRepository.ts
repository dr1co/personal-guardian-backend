import cuid from "cuid";

import client from "../databases/prisma";

export interface IWifi {
  id: string;
  title: string;
  name: string;
  password: string;
  userId: string;
}

export async function insert(wifi: Omit<IWifi, "id">) {
  const { title, name, password, userId } = wifi;

  const id = cuid();

  await client.wifis.create({
    data: {
      id,
      title,
      name,
      password,
      userId,
    },
  });
}

export async function getAll(userId: string) {
  return await client.wifis.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      title: true,
      name: true,
      password: true,
    },
  });
}

export async function deleteOne(id: string) {
  await client.wifis.delete({
    where: {
      id,
    },
  });
}
