import { NextFunction, Request, Response } from 'express';
import TeamsService from '../services/teams.service';

export default class UserController {
  public static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await TeamsService.findAll();
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }

  public static async findByPk(req: Request, res: Response, next: NextFunction) {
    try {
      const team = await TeamsService.findByPk(req.params.id as unknown as number);
      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }
}
