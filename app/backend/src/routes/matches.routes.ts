import * as express from 'express';
import MatchesController from '../controllers/matches.controller';

const route = express.Router();

route.get('/', (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => MatchesController.findAll(req, res, next));

export default route;
