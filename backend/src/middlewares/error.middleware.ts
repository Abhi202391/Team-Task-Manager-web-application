// middlewares/error.middleware.ts

import { NextFunction, Request, Response } from "express";

import { ApiError } from "../utils/ApiError";

export const errorMiddleware = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  return res.status(err.statusCode || 500).json({
    success: false,

    message:
      err.message || "Internal Server Error",

    errors: err.errors || [],
  });
};