import * as express from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import validateLogin from '../middlewares/login.middleware';
import UsersController from '../controllers/user.controller';
import UserService from '../services/user.service';

const route = express.Router();

const usersController = new UsersController(new UserService());

route.get('/validate', authMiddleware, usersController.findRole);
route.post('/', validateLogin, usersController.login);

export default route;
