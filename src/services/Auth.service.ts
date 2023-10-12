import { User, UserType } from '../models';
import bcrypt from 'bcrypt';

export type UserData = Omit<UserType, 'passwordHash'> & {
  password: string;
};

export const signup = async (userData: UserData) => {
  const { email, password, name, state } = userData;

  const user = await User.findOne({
    email,
  });

  if (user) {
    return new Error('E-mail já cadastrado!');
  }

  const userCreated = await User.create({
    email,
    passwordHash: bcrypt.hashSync(password, 10),
    name,
    state,
  });

  return userCreated;
};

export const findByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const matchPassword = (rawPassword: string, encodedPassword: string) => {
  return bcrypt.compareSync(rawPassword, encodedPassword);
};
