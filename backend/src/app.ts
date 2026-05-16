// app.ts

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes";

import { errorMiddleware }
from "./middlewares/error.middleware";

const app = express();

//////////////////////////////////////////////////////
// MIDDLEWARES
//////////////////////////////////////////////////////

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//////////////////////////////////////////////////////
// API ROUTES
//////////////////////////////////////////////////////

app.use("/api/v1", routes);

//////////////////////////////////////////////////////
// ERROR HANDLER
//////////////////////////////////////////////////////

app.use(errorMiddleware);

export default app;