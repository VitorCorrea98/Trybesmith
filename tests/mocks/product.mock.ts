import { ProductInputtableTypes } from "../../src/database/models/product.model";

export const PostCallerCorrect: ProductInputtableTypes = {
  name: "Martelo de Thor",
  price: "30 peças de ouro",
  userId: 1
};

export const PostResponseCorrect: ProductInputtableTypes = {
  id: 6,
  name: "Martelo de Thor",
  price: "30 peças de ouro",
  userId: 1
}

export const GetResponseCorrect: ProductInputtableTypes[] = [{
  id: 5,
  name: "Martelo de Thor",
  price: "30 peças de ouro",
  userId: 1
},{
  id: 6,
  name: "Martelo de Thor",
  price: "30 peças de ouro",
  userId: 2
}]