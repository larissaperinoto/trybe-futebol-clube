import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class UserController {
  public static async findAll(req: Request, res: Response, next: NextFunction) {
    console.log(req.query);
    try {
      const matches = await MatchesService.findAll();
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }

  public static async findByInProgessMatches(req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await MatchesService.findByInProgessMatches(req.query as unknown as boolean);
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }
}
