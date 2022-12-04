import ILogin from './ILogin';

export default interface IUserService {
  login(login: ILogin): Promise<string | void>
  findRole(email: string): Promise<{ role: string } | void>
}
