import { Request, Response } from 'express';
import productService from '../services/product.service';

const insert = async (req: Request, res: Response) => {
  const newProduct = req.body;

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