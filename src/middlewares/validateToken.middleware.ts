import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { AppError } from "../errors";

const validateTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError(401, "Missing authorization token.");
  }

  return verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      throw new AppError(400, err.message);
    }

    req.decoded = decoded as JwtPayload;

    return next();
  });
};

export default validateTokenMiddleware;
