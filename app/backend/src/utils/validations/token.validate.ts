import * as jsonwebtoken from 'jsonwebtoken';

type JWT = {
  email: string;
};

export default function tokenValidate(token: string) {
  const secret = process.env.JWT_SECRET as string;
  const credentials = jsonwebtoken.verify(token, secret);
  return credentials as JWT;
}
