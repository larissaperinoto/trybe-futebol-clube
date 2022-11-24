import * as express from 'express';
import UsersController from '../controllers/users.controller';

const route = express.Router();

const userController = new UsersController();

route.post('/', (req: express.Request, res: express.Response) => userController.login(req, res));

export default route;
