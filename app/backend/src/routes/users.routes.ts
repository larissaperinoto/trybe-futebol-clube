import * as express from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import UsersController from '../controllers/users.controller';
import validateLogin from '../middlewares/login.middleware';

const route = express.Router();

route.get('/validate', authMiddleware, (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => UsersController.findRole(req, res, next));

route.post('/', validateLogin, (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => UsersController.login(req, res, next));

export default route;
