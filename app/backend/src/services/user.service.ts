import * as bcrypt from 'bcryptjs';
import User from '../database/models/user.model';
import ILogin from '../interfaces/ILogin';
import tokenGenerate from '../utils/tokenGenerate';
import ErrorGenerate from '../utils/errorGenerate';
import IUserService from '../interfaces/IUserService';

export default class UserService implements IUserService {
  constructor(private _userModel = User) {}

  login = async (login: ILogin): Promise<string | void> => {
    const { email, password } = login;
    const userExists = await this._userModel.findOne({ where: { email } });

    if (userExists && bcrypt.compareSync(password, userExists.password)) {
      return tokenGenerate(login);
    }
    throw new ErrorGenerate(401, 'Incorrect email or password');
  };

  findRole = async (email: string): Promise<{ role: string } | void> => {
    const userInformation = await this._userModel.findOne({ where: { email } });
    if (userInformation) return { role: userInformation.role };
    throw new ErrorGenerate(401, 'Incorrect email or password');
  };
}
