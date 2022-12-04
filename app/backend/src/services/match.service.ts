import Team from '../database/models/team.model';
import Match from '../database/models/matches.model';
import IMatch from '../interfaces/IMatch';
import ErrorGenerate from '../utils/errorGenerate';
import { IMatchService, MatchGoals } from '../interfaces/IMatchService';

export default class MatchService implements IMatchService {
  constructor(private _matchModel = Match, private _teamModel = Team) {}

  findAll = async (): Promise<IMatch[]> => {
    const matches = await this._matchModel.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  };

  findWithWhere = async (query: boolean): Promise<IMatch[]> => {
    const matches = await this._matchModel.findAll({
      where: {
        inProgress: query,
      },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  };

  insert = async (match: IMatch): Promise<IMatch> => {
    if (match.homeTeam === match.awayTeam) {
      throw new ErrorGenerate(422, 'It is not possible to create a match with two equal teams');
    }
    const homeTeamExists = await this._teamModel.findByPk(match.homeTeam);
    const awayTeamExists = await this._teamModel.findByPk(match.awayTeam);
    if (!homeTeamExists || !awayTeamExists) {
      throw new ErrorGenerate(404, 'There is no team with such id!');
    }
    const matchInserted = await this._matchModel.create({ ...match, inProgress: true });
    return matchInserted;
  };

  matchIsOver = async (id: number): Promise<void> => {
    await this._matchModel.update(
      { inProgress: false },
      { where: { id } },
    );
  };

  update = async (id: number, match: MatchGoals): Promise<void> => {
    await this._matchModel.update(
      { homeTeamGoals: match.homeTeamGoals, awayTeamGoals: match.awayTeamGoals },
      { where: { id } },
    );
  };
}
