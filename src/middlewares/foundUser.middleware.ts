import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors";

const foundUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepo = AppDataSource.getRepository(User);
  const foundUser = await userRepo.findOneBy({ id: req.params.id });

  if (!foundUser) {
    throw new AppError(404, "User not found.");
  }

  req.foundUser = foundUser;

  return next();
};

export default foundUserMiddleware;
