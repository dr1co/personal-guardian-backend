import * as encryption from "./encryptionServices";
import * as wifiRepository from "../repositories/wifiRepository";

export async function addNew(wifi: Omit<wifiRepository.IWifi, "id">) {
  const encryptedPassword = encryption.encrypt(wifi.password);

  try {
    await wifiRepository.insert({ ...wifi, password: encryptedPassword });
  } catch (err: Error | any) {
    throw { code: "ServerProblem", message: err };
  }
}

export async function getAll(userId: string) {
  try {
    const wifis = await wifiRepository.getAll(userId);

    return wifis.map((wifi) => {
      return { ...wifi, password: encryption.decrypt(wifi.password) };
    });
  } catch (err: Error | any) {
    throw { code: "ServerProblem", message: err };
  }
}

export async function deleteOne(id: string, userId: string) {
  try {
    const wifis = await wifiRepository.getAll(userId);
    let matchId = false;

    for (let i = 0; i < wifis.length; i++) {
      if (wifis[i].id === id) {
        matchId = true;
        break;
      }
    }

    if (!matchId) {
      throw {
        code: "NotFound",
        message: "Error: could not find wifi to delete",
      };
    }

    await wifiRepository.deleteOne(id);
  } catch (err: Error | any) {
    if (err.code) {
      throw err;
    }
    throw { code: "ServerProblem", message: err };
  }
}
