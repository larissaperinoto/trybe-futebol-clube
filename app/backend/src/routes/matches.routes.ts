import * as express from 'express';
import MatchesController from '../controllers/matches.controller';

const route = express.Router();

const matchesController = new MatchesController();

route.patch('/:id', matchesController.update);
route.patch('/:id/finish', matchesController.matchIsOver);
route.get('/', matchesController.findAll);
route.post('/', matchesController.insert);

export default route;
