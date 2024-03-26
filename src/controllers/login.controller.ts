import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { LoginFields } from '../types/Login';
import loginService from '../services/login.service';

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

const createToken = async (req: Request, res: Response) => {
  const login: LoginFields = req.body;

  const response = await loginService.Login(login);
  if (response.status !== 200) return res.status(response.status).json(response.data);

  const userLogin = response.data as LoginFields;
  const token = jwt.sign({ userLogin }, secret);
  return res.status(response.status).json({ token });
};

export default {
  createToken,
};