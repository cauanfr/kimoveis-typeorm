import { Router } from "express";
import { propertyController } from "../controllers";
import {
  admPermissionMiddleware,
  validateTokenMiddleware,
} from "../middlewares";

const propertyRouter = Router();

propertyRouter.post(
  "",
  validateTokenMiddleware,
  admPermissionMiddleware,
  propertyController.create
);
propertyRouter.get("", propertyController.list);

export default propertyRouter;
