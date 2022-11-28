import { RequestHandler } from 'express';
import MatchesService from '../services/matches.service';

const matchesService = new MatchesService();

export default class MatchesController {
  findAll: RequestHandler = async (req, res, next) => {
    try {
      if (req.query.inProgress) {
        const matches = await matchesService.findWithWhere(req.query.inProgress === 'true');
        return res.status(200).json(matches);
      }
      const matches = await matchesService.findAll();
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };

  insert: RequestHandler = async (req, res, next) => {
    try {
      const matchInserted = await matchesService
        .insert(req.body, req.headers.authorization as string);
      return res.status(201).json(matchInserted);
    } catch (error) {
      next(error);
    }
  };

  matchIsOver: RequestHandler = async (req, res, next) => {
    try {
      await matchesService.matchIsOver(Number(req.params.id));
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  };

  update: RequestHandler = async (req, res, next) => {
    try {
      await matchesService.update(Number(req.params.id), req.body);
      return res.status(200).json({ message: 'Match is updated!' });
    } catch (error) {
      next(error);
    }
  };
}
