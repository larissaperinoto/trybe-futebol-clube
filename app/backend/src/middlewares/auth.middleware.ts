import * as jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';

const authMiddleware: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  try {
    const user = jwt.verify(authorization, process.env.JWT_SECRET as string);
    req.body.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default authMiddleware;
