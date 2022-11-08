import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

const admOrSameIdPermissionMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userTokenIsAdm = req.decoded.isAdm;
  const userTokenId = req.decoded.sub;
  const userParams = req.foundUser;

  if (!userTokenIsAdm && userTokenId !== userParams.id) {
    throw new AppError(401, "Forbiden");
  }

  return next();
};

export default admOrSameIdPermissionMiddleware;
