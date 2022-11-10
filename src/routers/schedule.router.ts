import { Router } from "express";
import scheduleController from "../controllers/schedule.controller";
import {
  admPermissionMiddleware,
  validateTokenMiddleware,
} from "../middlewares";

const scheduleRouter = Router();

scheduleRouter.post("", validateTokenMiddleware, scheduleController.create);
scheduleRouter.get(
  "/properties/:id",
  validateTokenMiddleware,
  admPermissionMiddleware,
  scheduleController.retrieveByProperty
);

export default scheduleRouter;
