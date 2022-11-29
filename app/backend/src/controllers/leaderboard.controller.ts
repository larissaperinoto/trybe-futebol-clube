import { RequestHandler } from 'express';
import LeaderboardService from '../services/leaderboard.service';

const leaderboardService = new LeaderboardService();

export default class LeaderboardController {
  getRatings: RequestHandler = async (req, res) => {
    const ratings = await leaderboardService.getRatings();
    return res.status(200).json(ratings);
  };
}
