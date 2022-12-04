import IMatch from './IMatch';

export type MatchGoals = { homeTeamGoals: string, awayTeamGoals: string };

export interface IMatchService {
  findAll(): Promise<IMatch[]>;
  findWithWhere(query: boolean): Promise<IMatch[]>;
  insert(match: IMatch): Promise<IMatch>;
  matchIsOver(id: number): Promise<void>;
  update(id: number, match: MatchGoals): Promise<void>;
}
