import { NextFunction, Request, Response } from 'express';
import UsersService from '../services/users.service';

const userService = new UsersService();

export default class UserController {
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await userService.login(req.body);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };
}
