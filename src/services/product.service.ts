import ProductModel, { ProductInputtableTypes, 
  ProductSequelizeModel } from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

const insert = async (product: ProductInputtableTypes): Promise<ServiceResponse<Product>> => {
  const newProduct = await ProductModel.create(product);
  console.log({ newProduct, product });
  return { status: 201, data: newProduct.dataValues };
};

const getAll = async (): Promise<ServiceResponse<ProductSequelizeModel[]>> => {
  const products = await ProductModel.findAll();
  return { status: 200, data: products }; 
};

const findByUserId = async (product: ProductInputtableTypes):
Promise<ServiceResponse<Product | undefined>> => {
  const productFound = await ProductModel.findOne({ where: { userId: product.userId } });
  return { status: 200, data: productFound?.dataValues }; 
};

export default {
  insert,
  getAll,
  findByUserId,
};