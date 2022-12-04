import * as express from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import MatchController from '../controllers/match.controller';
import MatchService from '../services/match.service';

const route = express.Router();

const matchController = new MatchController(new MatchService());

route.patch('/:id', matchController.update);
route.patch('/:id/finish', matchController.matchIsOver);
route.get('/', matchController.findAll);
route.post('/', authMiddleware, matchController.insert);

export default route;
