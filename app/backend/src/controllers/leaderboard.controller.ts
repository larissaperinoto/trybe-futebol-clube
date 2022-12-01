import { RequestHandler } from 'express';
import LeaderboardService from '../services/leaderboard.service';

const leaderboardService = new LeaderboardService();

export default class LeaderboardController {
  getClassificationHome: RequestHandler = async (req, res) => {
    const classification = await leaderboardService
      .getClassification('home_team_goals', 'away_team_goals', 'home_team');
    return res.status(200).json(classification);
  };

  getClassificationAway: RequestHandler = async (req, res) => {
    const classification = await leaderboardService
      .getClassification('away_team_goals', 'home_team_goals', 'away_team');
    return res.status(200).json(classification);
  };

  getGeneralClassification:RequestHandler = async (req, res) => {
    const generalClassification = await leaderboardService.getGeneralClassification();
    return res.status(200).json(generalClassification);
  };
}
