import Team from '../database/models/teams.model';
import Matche from '../database/models/matches.model';

export default class MatchesService {
  public static async findAll() {
    const matches = await Matche.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  public static async search(query: boolean) {
    const matches = await Matche.findAll({
      where: { inProgress: query },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }
}
