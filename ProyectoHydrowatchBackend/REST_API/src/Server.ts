  import express from "express";
  import dotenv from "dotenv";
  import cors from "cors";
  import stationRoutes from "./stations/infrastructure/router";
  import plantsRoutes from "./plants/infrasctructure/router";
  import userRoutes from "./users/infrasctructure/router";
  import recordRoutes from "./records/infrastructure/router";
  import { Request, Response, NextFunction } from "express";


  console.clear();
  console.log("Iniciando aplicación...");

  dotenv.config();

  const APP_PORT = process.env["APP_PORT"] ?? 3030;

  const app = express();

  app.use(
    cors({
      origin: "*",
      methods: ["*"],
    })
  );

  app.use(express.json({ limit: "100mb" }));

  app.use("/stations", stationRoutes);
  app.use("/plants", plantsRoutes);
  app.use("/users", userRoutes);
  app.use("/records", recordRoutes);


// Middleware de autenticación global
app.use((req : Request, res : Response, next : NextFunction ) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Token de autorización faltante" });
  }  
  next();
});


  app.listen(APP_PORT, () => {
    console.info(`Servidor listo y escuchando en: http://127.0.0.1:${APP_PORT}/`);
  });
