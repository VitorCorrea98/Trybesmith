import Joi from 'joi';

const ProductValidation = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.string().min(3).required(),
  userId: Joi.number().strict().required().messages({ positive: '"userId" not found' }),
});

export default {
  ProductValidation,
};