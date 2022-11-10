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
categoryRouter.get("", categoryController.list);
categoryRouter.get("/:id/properties", categoryController.retrieve);

export default categoryRouter;
