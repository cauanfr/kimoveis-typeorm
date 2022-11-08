import "reflect-metadata";
import "express-async-errors";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import express from "express";
import {
  userRouter,
  sessionRouter,
  categoryRouter,
  propertyRouter,
  scheduleRouter,
} from "./routers";
import { handleError } from "./errors";

expand(config());

const app = express();

app.use(express.json());


app.use("/users", userRouter);
app.use("/login", sessionRouter);
app.use("/categories", categoryRouter);
app.use("/properties", propertyRouter);
app.use("/schedules", scheduleRouter);

app.use(handleError);

export default app;
