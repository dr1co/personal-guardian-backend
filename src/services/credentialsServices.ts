import * as credentialsRepository from "../repositories/credentialsRepository";
import * as encryption from "./encryptionServices";

export async function addNew(
  credentials: Omit<credentialsRepository.ICredentials, "id">
) {
  const encryptedPassword = encryption.encrypt(credentials.password);

  try {
    await credentialsRepository.insert({
      ...credentials,
      password: encryptedPassword,
    });
  } catch (err: Error | any) {
    if (err.code === "P2002") {
      throw {
        code: "TitleCreated",
        message: "Error: you already created credentials with this title",
      };
    }
    throw { code: "ServerProblem", message: err };
  }
}

export async function getAll(userId: string) {
  try {
    const credentials = await credentialsRepository.getAll(userId);

    return credentials.map((cred) => {
      return { ...cred, password: encryption.decrypt(cred.password) };
    });
  } catch (err: Error | any) {
    throw { code: "ServerProblem", message: err };
  }
}

export async function deleteOne(id: string, userId: string) {
  try {
    const credentials = await credentialsRepository.getAll(userId);
    let matchId = false;

    for (let i = 0; i < credentials.length; i++) {
      if (credentials[i].id === id) {
        matchId = true;
        break;
      }
    }

    if (!matchId) {
      throw {
        code: "NotFound",
        message: "Error: could not find credentials to delete",
      };
    }

    await credentialsRepository.deleteOne(id);
  } catch (err: Error | any) {
    if (err.code) {
      throw err;
    }
    throw { code: "ServerProblem", message: err };
  }
}
