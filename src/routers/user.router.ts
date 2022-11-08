import { Router } from "express";
import { userController } from "../controllers";
import {
  admOrSameIdPermissionMiddleware,
  admPermissionMiddleware,
  foundUserMiddleware,
  validateTokenMiddleware,
} from "../middlewares";

const userRouter = Router();

userRouter.post("", userController.createUser);
userRouter.get(
  "",
  validateTokenMiddleware,
  admPermissionMiddleware,
  userController.getUsers
);
userRouter.patch(
  "/:id",
  foundUserMiddleware,
  validateTokenMiddleware,
  admOrSameIdPermissionMiddleware,
  userController.updateUser
);
userRouter.delete(
  "/:id",
  foundUserMiddleware,
  validateTokenMiddleware,
  admPermissionMiddleware,
  userController.deleteUser
);

export default userRouter;
