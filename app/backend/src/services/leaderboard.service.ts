import { QueryTypes } from 'sequelize';
import ILeaderboard from '../interfaces/ILeaderboard';
import sequelizeModel from '../database/models';
import query from '../utils/queryGenerate';
import leaderboardGenerate from '../utils/leaderboardGenerate';

type teamGoals = 'home_team_goals' | 'away_team_goals';
type reference = 'home_team' | 'away_team';

export default class LeaderboardService {
  constructor(private _model = sequelizeModel) {}

  async getClassification(
    team1: teamGoals,
    team2: teamGoals,
    reference: reference,
  ): Promise<ILeaderboard[]> {
    const classification = await this._model
      .query(
        query
          .replace(/:team1/g, team1)
          .replace(/:team2/g, team2)
          .replace(/:reference/g, reference),
        {
          type: QueryTypes.SELECT,
        },
      );

    return classification as unknown as ILeaderboard[];
  }

  async getGeneralClassification() {
    const homeClassification = await this
      .getClassification('home_team_goals', 'away_team_goals', 'home_team');
    const awayClassification = await this
      .getClassification('away_team_goals', 'home_team_goals', 'away_team');

    const classification = leaderboardGenerate(homeClassification, awayClassification);
    console.log('LENGHT', classification.length);
    return classification as unknown as ILeaderboard[];
  }
}
