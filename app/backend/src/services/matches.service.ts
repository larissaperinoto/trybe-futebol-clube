import Team from '../database/models/teams.model';
import Match from '../database/models/matches.model';
import IMatch from '../interfaces/IMatch';
import tokenValidate from '../utils/validations/token.validate';
import ErrorGenerate from '../utils/errorGenerate';

export default class MatchesService {
  public static async findAll() {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  public static async findWithWhere(query: boolean) {
    const matches = await Match.findAll({
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

  public static async insert(match: IMatch, token: string) {
    const { email } = tokenValidate(token);
    if (email) {
      const verifyTeamsIds = match.homeTeam === match.awayTeam;
      if (verifyTeamsIds) {
        throw new ErrorGenerate(422, 'It is not possible to create a match with two equal teams');
      }
      const homeTeamExists = await Match.findByPk(match.homeTeam);
      const awayTeamExists = await Match.findByPk(match.awayTeam);
      console.log(awayTeamExists);
      if (!homeTeamExists || !awayTeamExists) {
        throw new ErrorGenerate(404, 'There is no team with such id!');
      }
      const matchInserted = await Match.create({ ...match, inProgress: true });
      return matchInserted;
    }

    throw new ErrorGenerate(401, 'Token must be a valid token');
  }

  public static async update(id: number) {
    console.log(id);
    await Match.update(
      { inProgress: false },
      { where: { id } },
    );
  }
}
