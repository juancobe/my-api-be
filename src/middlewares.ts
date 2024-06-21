import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import ErrorResponse from './interfaces/ErrorResponse';
import { IGetUserAuthInfoRequest, JwtPayload } from './interfaces/Auth';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

export const authenticateJWT = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.userAccount = user as JwtPayload;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};