import * as express from 'express';
import MatchesController from '../controllers/matches.controller';

const route = express.Router();

route.get('/', (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => MatchesController.findAll(req, res, next));

route.post('/', (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => MatchesController.insert(req, res, next));

route.patch('/:id/finish', (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => MatchesController.update(req, res, next));

export default route;
