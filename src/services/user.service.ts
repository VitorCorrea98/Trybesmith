import sequelize from '../database/models/index';
import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import UserModel, { UserSequelizeModel } from '../database/models/user.model';
import { ServiceResponse } from '../types/ServiceResponse';
import { User } from '../types/User';

const getAll = async (): Promise<ServiceResponse<UserSequelizeModel[]>> => {
  const users = await UserModel.findAll({
    attributes: ['username',
      [sequelize.fn('JSON_ARRAYAGG', sequelize.col('productIds.id')), 'productIds'],  
    ],
    include: [{
      model: ProductModel,
      as: 'productIds',
      attributes: [],
    }],
    group: ['User.id'],
    raw: true,
  });
  return { status: 200, data: users };
};

const findUserByUserId = async (product: ProductInputtableTypes):
Promise<User | undefined> => {
  const productFound = await UserModel.findOne({ where: { id: product.userId } });
  return productFound?.dataValues;
};

export default {
  getAll,
  findUserByUserId,
};