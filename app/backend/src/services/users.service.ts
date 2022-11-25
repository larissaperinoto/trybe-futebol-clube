import * as bcrypt from 'bcryptjs';
import tokenValidate from '../utils/validations/token.validate';
import User from '../database/models/user.model';
import ILogin from '../interfaces/ILogin';
import tokenGenerate from '../utils/tokenGenerate';
import ErrorGenerate from '../utils/errorGenerate';

export default class UserService {
  public static async login(user: ILogin) {
    const userExists = await User
      .findOne({ where: { email: user.email } });
    if (userExists && bcrypt.compareSync(user.password, userExists.password)) {
      return tokenGenerate(user);
    }
    throw new ErrorGenerate(401, 'Incorrect email or password');
  }

  public static async findRole(token: string) {
    const { email } = tokenValidate(token);
    if (email) {
      const userInformation = await User
        .findOne({ where: { email } });
      if (userInformation) {
        return { role: userInformation.role };
      }
    }
  }
}
