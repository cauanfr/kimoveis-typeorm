import { NextFunction, Request, Response } from "express";

class AppError extends Error {
  public statusCode: number;

  constructor(statusCode: number = 400, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

const handleError = (err: Error, _: Request, res: Response, __: NextFunction) => {
  const { message } = err;
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message });
  }

  return res.status(500).json({
    error: "Server error",
    message,
  });
};

export { handleError, AppError };
