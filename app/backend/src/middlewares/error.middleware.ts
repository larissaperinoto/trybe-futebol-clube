import { NextFunction, Request, Response } from 'express';
import ErrorGenerate from '../utils/errorGenerate';

const errorMiddleware = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  const { status, message } = err as ErrorGenerate;
  return res.status(status).json({ message });
};

export default errorMiddleware;
