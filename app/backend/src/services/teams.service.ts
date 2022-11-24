import Team from '../database/models/teams.model';

export default class UserService {
  public static async findAll() {
    const teams = await Team.findAll();
    return teams;
  }
}
