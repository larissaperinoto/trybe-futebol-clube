import { QueryTypes } from 'sequelize';
import ILeaderboard from '../interfaces/ILeaderboard';
import sequelizeModel from '../database/models';
import query from '../utils/queryGenerate';
import leaderboardGenerate from '../utils/leaderboardGenerate';
import { teamGoals, reference, ILeaderboardService } from '../interfaces/ILeaderboardService';

export default class LeaderboardService implements ILeaderboardService {
  constructor(private _model = sequelizeModel) {}

  getClassification = async (
    team1: teamGoals,
    team2: teamGoals,
    teamReference: reference,
  ): Promise<ILeaderboard[]> => {
    const classification: ILeaderboard[] = await this._model
      .query(
        query
          .replace(/:team1/g, team1)
          .replace(/:team2/g, team2)
          .replace(/:reference/g, teamReference),
        {
          type: QueryTypes.SELECT,
        },
      );

    return classification;
  };

  getGeneralClassification = async (): Promise<ILeaderboard[]> => {
    const homeClassification = await this
      .getClassification('home_team_goals', 'away_team_goals', 'home_team');
    const awayClassification = await this
      .getClassification('away_team_goals', 'home_team_goals', 'away_team');

    const classification: ILeaderboard[] = leaderboardGenerate(
      homeClassification,
      awayClassification,
    );
    return classification;
  };
}
