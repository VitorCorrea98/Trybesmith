import { Request, Response } from 'express';
import productService from '../services/product.service';
import productValidation from '../services/validations/product.validation';
import userService from '../services/user.service';
import { ProductInputtableTypes } from '../database/models/product.model';

const insert = async (req: Request, res: Response) => {
  const newProduct = req.body as ProductInputtableTypes;

  const { error } = productValidation.ProductValidation.validate(newProduct);
  console.log({ error, newProduct });
  if (error) {
    let errorStatus = 422;
    if (error.message.includes('required')) {
      errorStatus = 400;
    }
    return res.status(errorStatus).json({ message: error.message });
  }

  const user = await userService.findUserByUserId(newProduct);
  if (!user) return res.status(422).json({ message: '"userId" not found' });
  console.log({ user });
   
  const { status, data } = await productService.insert(newProduct);
  return res.status(status).json(data);
};

const getAll = async (_req: Request, res: Response) => {
  const { status, data } = await productService.getAll();
  return res.status(status).json(data);
};

export default {
  insert,
  getAll,
};