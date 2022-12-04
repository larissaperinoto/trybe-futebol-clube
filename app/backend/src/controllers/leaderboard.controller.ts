import { RequestHandler } from 'express';
import { ILeaderboardService } from '../interfaces/ILeaderboardService';

export default class LeaderboardController {
  constructor(private _leaderboardService: ILeaderboardService) {}

  getClassificationHome: RequestHandler = async (req, res) => {
    const classification = await this._leaderboardService
      .getClassification('home_team_goals', 'away_team_goals', 'home_team');
    return res.status(200).json(classification);
  };

  getClassificationAway: RequestHandler = async (req, res) => {
    const classification = await this._leaderboardService
      .getClassification('away_team_goals', 'home_team_goals', 'away_team');
    return res.status(200).json(classification);
  };

  getGeneralClassification:RequestHandler = async (req, res) => {
    const generalClassification = await this._leaderboardService.getGeneralClassification();
    return res.status(200).json(generalClassification);
  };
}
