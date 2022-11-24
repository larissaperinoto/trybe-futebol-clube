import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class UserController {
  public static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await MatchesService.findAll();
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }

  public static async search(req: Request, res: Response, next: NextFunction) {
    try {
      const bool = req.query.inProgress === 'true';
      const matches = await MatchesService.search(bool);
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }
}
