import * as jsonwebtoken from 'jsonwebtoken';
import IUser from '../interfaces/ILogin';

export default function generateToken(user:IUser) {
  const payload = { email: user.email, username: user.username };
  const secret = process.env.JWT_SECRET as string;
  const jwt = jsonwebtoken;
  return jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: '1d' });
}
