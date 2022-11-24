import Team from '../database/models/teams.model';

export default class TeamsService {
  public static async findAll() {
    const teams = await Team.findAll();
    return teams;
  }

  public static async findByPk(id: number) {
    const team = await Team.findByPk(id);
    return team;
  }
}
