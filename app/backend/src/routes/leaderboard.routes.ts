import * as express from 'express';
import LeaderboardService from '../services/leaderboard.service';
import LeaderboardController from '../controllers/leaderboard.controller';

const route = express.Router();

const leaderboardController = new LeaderboardController(new LeaderboardService());

route.get('/home', leaderboardController.getClassificationHome);
route.get('/away', leaderboardController.getClassificationAway);
route.get('/', leaderboardController.getGeneralClassification);

export default route;
