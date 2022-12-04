import * as express from 'express';
import TeamService from '../services/team.service';
import TeamController from '../controllers/team.controller';

const route = express.Router();

const teamController = new TeamController(new TeamService());

route.get('/:id', teamController.findByPk);
route.get('/', teamController.findAll);

export default route;
