import Team from '../database/models/teams.model';
import Match from '../database/models/matches.model';
import IMatch from '../interfaces/IMatch';
import tokenValidate from '../utils/validations/token.validate';

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
      const matchInserted = await Match.create({ ...match, inProgress: true });
      return matchInserted;
    }
  }
}
