import bcrypt from 'bcryptjs';
import UserModel, { UserSequelizeModel } from '../database/models/user.model';
import { LoginFields } from '../types/Login';
import { ServiceResponse } from '../types/ServiceResponse';
import LoginValidation from './validations/login.validation';

const findOne = async (login: LoginFields): Promise<UserSequelizeModel | null> =>
  UserModel.findOne({ where: { username: login.username } });

const Login = async (fields: LoginFields): 
Promise<ServiceResponse<LoginFields>> => {
  const { error } = LoginValidation.validate(fields);
  if (error) return { status: 400, data: { message: error.message } };

  const user = await findOne(fields);
  if (!user || !bcrypt.compareSync(fields.password, user.dataValues.password)) {
    return { status: 401, data: { message: 'Username or password invalid' } };
  }

  return { status: 200, data: user.dataValues };
};

export default {
  Login,
};