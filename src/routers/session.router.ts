import { Router } from "express";
import { sessionController } from "../controllers";

const sessionRouter = Router();

sessionRouter.post("", sessionController.login);

export default sessionRouter;
