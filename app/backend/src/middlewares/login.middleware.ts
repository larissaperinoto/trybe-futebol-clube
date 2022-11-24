import { NextFunction, Request, Response } from 'express';
import validateLoginFields from '../utils/validations/login.validation';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const message = validateLoginFields(req.body);

  if (message) return res.status(400).json({ message });

  next();
};

export default validateLogin;
