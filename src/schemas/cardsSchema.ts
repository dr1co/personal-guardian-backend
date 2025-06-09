import joi from "joi";

import { ICard } from "../repositories/cardsRepository";

export const cardsSchema = joi.object<Omit<ICard, "id, userId">>({
  title: joi.string().required(),
  number: joi
    .string()
    .required()
    .length(16)
    .pattern(/^[0-9]+$/, "numbers")
    .messages({
      "string.pattern": "Card number must have numbers only.",
    }),
  securityCode: joi
    .string()
    .required()
    .length(3)
    .pattern(/^[0-9]+$/, "numbers")
    .messages({
      "string.pattern": "Card security code must have numbers only.",
    }),
  expirationDate: joi
    .string()
    .required()
    .pattern(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Exp date")
    .messages({
      "string.pattern": "Expiration date must be in format 'MM/YY'.",
    }),
  password: joi
    .string()
    .required()
    .length(4)
    .pattern(/^[0-9]+$/, "numbers")
    .messages({
      "string.pattern": "Card password must have numbers only.",
    }),
  isVirtual: joi.boolean().required(),
  type: joi.string().required().valid("CREDIT", "DEBIT", "DUAL"),
});
