import Team from '../database/models/teams.model';
import Matche from '../database/models/matches.model';

export default class MatchesService {
  public static async findAll() {
    const matches = await Matche.findAll({
      include: [
        { model: Team, as: 'homeMatchBelongsTo', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayMatchBelongsTo', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }
}
