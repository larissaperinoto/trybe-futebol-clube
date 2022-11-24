// import User from '../database/models/user.model';
import ILogin from '../interfaces/ILogin';
import tokenGenerate from '../utils/tokenGenerate';
// import ErrorGenerate from '../utils/errorGenerate';

const login = async (user: ILogin) => tokenGenerate(user);

export default { login };
