import * as express from 'express';
import TeamController from '../controllers/teams.controller';

const route = express.Router();

route.get('/:id', (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => TeamController.findByPk(req, res, next));

route.get('/', (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => TeamController.findAll(req, res, next));

export default route;
