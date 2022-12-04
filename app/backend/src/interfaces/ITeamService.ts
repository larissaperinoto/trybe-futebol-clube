import ITeam from './ITeam';

export default interface ITeamService {
  findAll(): Promise<ITeam[] | void>;
  findByPk(id: number): Promise<ITeam | void>;
}
