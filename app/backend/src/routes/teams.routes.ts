import * as express from 'express';
import TeamsController from '../controllers/teams.controller';

const route = express.Router();

route.get('/:id', (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => TeamsController.findByPk(req, res, next));

route.get('/', (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => TeamsController.findAll(req, res, next));

export default route;
