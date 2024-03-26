import Joi from 'joi';

const LoginValidation = Joi.object({
  username: Joi.string()
    .required()
    .messages({ 'any.required': '"username" and "password" are required' }),
  password: Joi.string()
    .required()
    .messages({ 'any.required': '"username" and "password" are required' }),
});

export default LoginValidation;