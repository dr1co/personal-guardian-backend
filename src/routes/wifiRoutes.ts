import express from "express";

import validateToken from "../middlewares/validateTokenMiddleware";
import validateSchema from "../middlewares/validateSchemaMiddleware";
import { wifiSchema } from "../schemas/wifiSchema";
import {
  createWifi,
  getAllWifis,
  deleteWifi,
} from "../controllers/wifiController";

const wifiRouter = express.Router();

wifiRouter.post(
  "/wifis",
  validateToken,
  validateSchema(wifiSchema),
  createWifi
);
wifiRouter.get("/wifis", validateToken, getAllWifis);
wifiRouter.delete("/wifis/:id", validateToken, deleteWifi);

export default wifiRouter;
