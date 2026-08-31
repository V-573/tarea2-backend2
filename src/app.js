import express from "express";
import apiRouter from "./routers/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas principales
app.use('/api', apiRouter);

app.use(errorHandler);

export default app;
