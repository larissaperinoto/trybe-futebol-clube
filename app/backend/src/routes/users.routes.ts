import * as express from 'express';
import UsersController from '../controllers/users.controller';

const route = express.Router();

const userController = new UsersController();

route.post('/', (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => userController.login(req, res, next));

export default route;
