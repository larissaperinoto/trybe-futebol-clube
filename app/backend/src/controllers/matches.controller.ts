import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  public static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.query.inProgress) {
        const matches = await MatchesService.findWithWhere(req.query.inProgress === 'true');
        return res.status(200).json(matches);
      }
      const matches = await MatchesService.findAll();
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }

  public static async insert(req: Request, res: Response, next: NextFunction) {
    try {
      const matchInserted = await MatchesService
        .insert(req.body, req.headers.authorization as string);
      return res.status(201).json(matchInserted);
    } catch (error) {
      next(error);
    }
  }
}
