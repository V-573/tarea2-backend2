import express from "express";
import apiRouter from "./routers/index.js";

const app = express();

app.use(express.json());

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas principales
app.use('/api', apiRouter);

export default app;
