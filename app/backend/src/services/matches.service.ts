import Team from '../database/models/teams.model';
import Matche from '../database/models/matches.model';
import IWhere from '../interfaces/IWhere';

export default class MatchesService {
  public static async findAll(query: IWhere | undefined) {
    const matches = await Matche.findAll({
      ...query,
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }
}
