import { RequestHandler } from 'express';
import { IMatchService } from '../interfaces/IMatchService';

export default class MatchesController {
  constructor(private _matchService: IMatchService) {}

  findAll: RequestHandler = async (req, res) => {
    let matches = [];
    if (req.query.inProgress) {
      matches = await this._matchService.findWithWhere(req.query.inProgress === 'true');
    } else {
      matches = await this._matchService.findAll();
    }
    return res.status(200).json(matches);
  };

  insert: RequestHandler = async (req, res, next) => {
    try {
      const matchInserted = await this._matchService.insert(req.body);
      return res.status(201).json(matchInserted);
    } catch (error) {
      next(error);
    }
  };

  matchIsOver: RequestHandler = async (req, res) => {
    await this._matchService.matchIsOver(Number(req.params.id));
    return res.status(200).json({ message: 'Finished' });
  };

  update: RequestHandler = async (req, res) => {
    await this._matchService.update(Number(req.params.id), req.body);
    return res.status(200).json({ message: 'Match is updated!' });
  };
}
