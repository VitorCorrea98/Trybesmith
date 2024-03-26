import ProductModel from '../database/models/product.model';
import UserModel, { UserSequelizeModel } from '../database/models/user.model';
import { ServiceResponse } from '../types/ServiceResponse';
import { UserFindAll } from '../types/User';

const extractProductIdsNumbers = (users: UserSequelizeModel[]): (number[] | undefined)[] => {
  const numbersExtracted = users
    .map((user) => user.dataValues.productIds?.map((product) => product.id));
  return numbersExtracted;
};

const getAll = async (): Promise<ServiceResponse<UserFindAll[]>> => {
  const users = await UserModel.findAll({
    attributes: ['username'],
    include: {
      model: ProductModel,
      as: 'productIds',
      attributes: ['id'],
    },
  });

  const numbersExtracted = extractProductIdsNumbers(users);

  const fixedAnswer = users.map((user, index) => ({
    username: user.dataValues.username,
    productIds: numbersExtracted[index],
  }));

  return { status: 200, data: fixedAnswer };
};

export default {
  getAll,
};