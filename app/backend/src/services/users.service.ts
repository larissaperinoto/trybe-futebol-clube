import User from '../database/models/user.model';
import ILogin from '../interfaces/ILogin';
import tokenGenerate from '../utils/tokenGenerate';
import ErrorGenerate from '../utils/errorGenerate';

export default class UserService {
  login = async (user: ILogin) => {
    const userExists = await User
      .findOne({ where: { email: user.email, password: user.password } });

    if (!userExists) {
      throw new ErrorGenerate(401, 'Incorrect email or password');
    }

    return tokenGenerate(user);
  };
}
