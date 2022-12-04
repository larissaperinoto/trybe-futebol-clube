import Team from '../database/models/team.model';
import Match from '../database/models/matches.model';
import IMatch from '../interfaces/IMatch';
import ErrorGenerate from '../utils/errorGenerate';

type MatchGoals = { homeTeamGoals: string, awayTeamGoals: string };

export default class MatchesService {
  constructor(private _matchModel = Match, private _teamModel = Team) {}

  async findAll(): Promise<IMatch[]> {
    const matches = await this._matchModel.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  async findWithWhere(query: boolean): Promise<IMatch[]> {
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
  }

  async insert(match: IMatch): Promise<IMatch> {
    const verifyTeamsIds = match.homeTeam === match.awayTeam;
    if (verifyTeamsIds) {
      throw new ErrorGenerate(422, 'It is not possible to create a match with two equal teams');
    }
    const homeTeamExists = await this._teamModel.findByPk(match.homeTeam);
    const awayTeamExists = await this._teamModel.findByPk(match.awayTeam);
    if (!homeTeamExists || !awayTeamExists) {
      throw new ErrorGenerate(404, 'There is no team with such id!');
    }
    const matchInserted = await this._matchModel.create({ ...match, inProgress: true });
    return matchInserted;
  }

  async matchIsOver(id: number): Promise<void> {
    await this._matchModel.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  async update(id: number, match: MatchGoals): Promise<void> {
    await this._matchModel.update(
      { homeTeamGoals: match.homeTeamGoals, awayTeamGoals: match.awayTeamGoals },
      { where: { id } },
    );
  }
}
