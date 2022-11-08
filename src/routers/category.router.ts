import { Router } from "express";
import { categoryController } from "../controllers";
import {
  admPermissionMiddleware,
  validateTokenMiddleware,
} from "../middlewares";

const categoryRouter = Router();

categoryRouter.post(
  "",
  validateTokenMiddleware,
  admPermissionMiddleware,
  categoryController.create
);
categoryRouter.get("", categoryController.retrieve);
categoryRouter.get("/:id/properties", categoryController.retrieveProperty);

export default categoryRouter;
