import { User } from "../../src/types/User";
import bcrypt from 'bcryptjs';


const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || 10;


const mockUser: User = {
  id: 1,
  username: 'Vitao',
  password: bcrypt.hashSync('Fluzao', SALT_ROUNDS),
  level: 10,
  vocation: 'Guerreiro'
};

export default {
  mockUser
}