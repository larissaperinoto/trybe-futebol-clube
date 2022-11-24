import * as bcrypt from 'bcryptjs';

export default function hashGenerate(password: string): string {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}
