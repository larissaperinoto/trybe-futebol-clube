import { NextFunction, Request, Response } from 'express';
import whereGenerate from '../utils/whereGenarete';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  public static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const bool = whereGenerate(req.query.inProgress === 'true');
      const matches = await MatchesService.findAll(bool);
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }
}
