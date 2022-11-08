import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

const admPermissionMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.decoded.isAdm) {
    throw new AppError(403, "Invalid admin permission.");
  }

  return next();
};

export default admPermissionMiddleware;
