import { QueryTypes } from 'sequelize';
import ILeaderboard from '../interfaces/ILeaderboard';
import sequelizeModel from '../database/models';

const query = `
  SELECT
    t.team_name as name,
    (
      (SUM(m.home_team_goals > m.away_team_goals) * 3) +
      SUM(m.home_team_goals = m.away_team_goals)
    ) as totalPoints,
    COUNT(m.home_team) as totalGames,
    SUM(m.home_team_goals > m.away_team_goals) as totalVictories,
    SUM(m.home_team_goals = m.away_team_goals) as totalDraws,
    SUM(m.home_team_goals < m.away_team_goals) as totalLosses,
    SUM(m.home_team_goals) as goalsFavor,
    SUM(m.away_team_goals) as goalsOwn,
    (SUM(m.home_team_goals) - SUM(m.away_team_goals)) as goalsBalance,
    FORMAT(
      (
        (
          (SUM(m.home_team_goals > m.away_team_goals) * 3) +
          SUM(m.home_team_goals = m.away_team_goals)
        ) / (COUNT(m.home_team) * 3)
      ) * 100, 2
    ) AS efficiency
  FROM TRYBE_FUTEBOL_CLUBE.matches as m
  INNER JOIN TRYBE_FUTEBOL_CLUBE.teams as t ON m.home_team = t.id
  WHERE m.in_progress = 0
  GROUP BY name
  ORDER BY totalPoints DESC, efficiency DESC, goalsFavor DESC, goalsOwn, name;`;

export default class LeaderboardService {
  constructor(private _model = sequelizeModel) {}

  async getRatings(): Promise<ILeaderboard[]> {
    const ratings = await this._model.query(query, { type: QueryTypes.SELECT });
    return ratings as unknown as ILeaderboard[];
  }
}
