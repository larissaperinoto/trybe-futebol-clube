import * as Joi from 'joi';
import ILogin from '../../interfaces/ILogin';

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateLoginFields = (body: ILogin) => {
  const { error } = loginSchema.validate(body);
  if (error) return 'All fields must be filled';
};

export default validateLoginFields;
