import * as express from 'express';
import UsersController from '../controllers/users.controller';
import validateLogin from '../middlewares/login.middleware';

const route = express.Router();

const userController = new UsersController();

route.post('/', validateLogin, (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => userController.login(req, res, next));

export default route;
