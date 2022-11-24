import { Request, Response } from 'express';
import usersService from '../services/users.service';

export default class UserController {
  // eslint-disable-next-line class-methods-use-this
  async login(req: Request, res: Response) {
    console.log(req.body);
    const token = await usersService.login(req.body);
    res.status(200).json(token);
  }
}
