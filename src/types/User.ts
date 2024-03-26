export type User = {
  id: number;
  username: string;
  vocation: string;
  level: number;
  password: string;
  productIds?: {
    id: number
  }[];
};

export type UserFindAll = {
  username: string,
  productIds: number[] | undefined
};
