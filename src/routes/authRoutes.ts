import express from "express";

import validateSchema from "../middlewares/validateSchemaMiddleware";
import { userSchema } from "../schemas/userSchema";
import { createUser, loginUser } from "../controllers/userController";

const authRouter = express.Router();

authRouter.post("/signup", validateSchema(userSchema), createUser);
authRouter.post("/signin", validateSchema(userSchema), loginUser);

export default authRouter;
