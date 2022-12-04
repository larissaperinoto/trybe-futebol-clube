import { RequestHandler } from 'express';
import IUserService from '../interfaces/IUserService';

export default class UserController {
  constructor(private _userService: IUserService) {}

  login: RequestHandler = async (req, res, next) => {
    try {
      const token = await this._userService.login(req.body);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };

  findRole: RequestHandler = async (req, res, next) => {
    try {
      const role = await this._userService.findRole(req.body.user.email);
      return res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  };
}
