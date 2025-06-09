import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

const jwtKey = process.env.JWT_SECRET || "personalguardian";

export default function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(404).send("On validateToken: Error: token not found");
  }

  try {
    const user = jwt.verify(token, jwtKey);

    res.locals.user = user;

    next();
  } catch (err) {
    return res
      .status(422)
      .send("On validateToken: Error: token is corrupted/expired");
  }
}
