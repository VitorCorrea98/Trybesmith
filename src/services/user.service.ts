import sequelize from '../database/models/index';
import ProductModel from '../database/models/product.model';
import UserModel, { UserSequelizeModel } from '../database/models/user.model';
import { ServiceResponse } from '../types/ServiceResponse';

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

export default {
  getAll,
};