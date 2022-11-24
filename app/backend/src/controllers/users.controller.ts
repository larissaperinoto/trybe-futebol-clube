import { NextFunction, Request, Response } from 'express';
import UsersService from '../services/users.service';

export default class UserController {
  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await UsersService.login(req.body);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  public static async findRole(req: Request, res: Response, next: NextFunction) {
    try {
      const role = await UsersService.findRole(req.headers.authorization as string);
      return res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  }
}
