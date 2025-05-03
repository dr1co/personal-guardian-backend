import * as encryption from "./encryptionServices";
import * as cardsRepository from "../repositories/cardsRepository";

export async function addNew(card: Omit<cardsRepository.ICard, "id">) {
  const encryptedSecCode = encryption.encrypt(card.securityCode);
  const encryptedPassword = encryption.encrypt(card.password);

  try {
    await cardsRepository.insert({
      ...card,
      securityCode: encryptedSecCode,
      password: encryptedPassword,
    });
  } catch (err: Error | any) {
    if (err.code === "P2002") {
      throw {
        code: "TitleCreated",
        message: "Error: you already created a card with this title",
      };
    }
    throw { code: "ServerProblem", message: err };
  }
}

export async function getAll(userId: string) {
  try {
    const cards = await cardsRepository.getAll(userId);

    return cards.map((card) => {
      return {
        ...card,
        securityCode: encryption.decrypt(card.securityCode),
        password: encryption.decrypt(card.password),
      };
    });
  } catch (err: Error | any) {
    throw { code: "ServerProblem", message: err };
  }
}

export async function deleteOne(id: string, userId: string) {
  try {
    const cards = await cardsRepository.getAll(userId);
    let matchId = false;

    for (let i = 0; i < cards.length; i++) {
      if (cards[i].id === id) {
        matchId = true;
        break;
      }
    }

    if (!matchId) {
      throw {
        code: "NotFound",
        message: "Error: could not find card to delete",
      };
    }

    await cardsRepository.deleteOne(id);
  } catch (err: Error | any) {
    if (err.code) {
      throw err;
    }
    throw { code: "ServerProblem", message: err };
  }
}
