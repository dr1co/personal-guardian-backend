import bcrypt from "bcrypt";
import Cryptr from "cryptr";
import dotenv from "dotenv";

dotenv.config();

const cryptrKey = process.env.CRYPTR_KEY || "personalguardian";
const bcryptKey = Number(process.env.BCRYPT_HASH_KEY) || 5;

const cryptr = new Cryptr(cryptrKey);

export function oneWayEncrypt(string: string) {
  return bcrypt.hashSync(string, bcryptKey);
}

export function validateOneWay(string: string, comparator: string) {
  return bcrypt.compareSync(string, comparator);
}

export function encrypt(string: string) {
  return cryptr.encrypt(string);
}

export function decrypt(string: string) {
  return cryptr.decrypt(string);
}
