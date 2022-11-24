import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class UserController {
  public static async findAll(req: Request, res: Response, _next: NextFunction) {
    const matches = await MatchesService.findAll();
    return res.status(200).json(matches);
  }
}
