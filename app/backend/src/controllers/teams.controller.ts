import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/teams.service';

export default class UserController {
  public static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await TeamService.findAll();
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }
}
