import { Router } from "express";
import { userController } from "../controllers";
import {
  admOrSameIdPermissionMiddleware,
  admPermissionMiddleware,
  foundUserMiddleware,
  validateTokenMiddleware,
} from "../middlewares";

const userRouter = Router();

userRouter.post("", userController.create);
userRouter.get(
  "",
  validateTokenMiddleware,
  admPermissionMiddleware,
  userController.retrieve
);
userRouter.patch(
  "/:id",
  foundUserMiddleware,
  validateTokenMiddleware,
  admOrSameIdPermissionMiddleware,
  userController.update
);
userRouter.delete(
  "/:id",
  foundUserMiddleware,
  validateTokenMiddleware,
  admPermissionMiddleware,
  userController.delete
);

export default userRouter;
