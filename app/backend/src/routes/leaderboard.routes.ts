import * as express from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const route = express.Router();

const leaderboardController = new LeaderboardController();

route.get('/home', leaderboardController.getRatings);

export default route;
