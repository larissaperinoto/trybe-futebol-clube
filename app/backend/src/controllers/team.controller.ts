import { RequestHandler } from 'express';
import ITeamService from '../interfaces/ITeamService';

export default class TeamController {
  constructor(private _teamService: ITeamService) {}

  findAll: RequestHandler = async (req, res) => {
    const teams = await this._teamService.findAll();
    return res.status(200).json(teams);
  };

  findByPk: RequestHandler = async (req, res) => {
    const team = await this._teamService.findByPk(Number(req.params.id));
    return res.status(200).json(team);
  };
}
