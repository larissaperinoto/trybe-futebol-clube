import ILeaderboard from './ILeaderboard';

export type teamGoals = 'home_team_goals' | 'away_team_goals';

export type reference = 'home_team' | 'away_team';

export interface ILeaderboardService {
  getClassification(
    team1: teamGoals,
    team2: teamGoals,
    teamReference: reference,
  ): Promise<ILeaderboard[]>

  getGeneralClassification(): Promise<ILeaderboard[]>
}
