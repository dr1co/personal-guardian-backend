import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRouter from "./routes/authRoutes";
import credentialsRouter from "./routes/credentialsRoutes";
import notesRouter from "./routes/notesRoutes";
import cardsRouter from "./routes/cardsRoutes";
import wifiRouter from "./routes/wifiRoutes";

const PORT = Number(process.env.PORT) || 4001;

const server = express();

server.use(express.json());
server.use(cors());

server.use(authRouter);
server.use(credentialsRouter);
server.use(notesRouter);
server.use(cardsRouter);
server.use(wifiRouter);

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
