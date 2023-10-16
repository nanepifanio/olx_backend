import { User, State, UserType } from '../models';
import bcrypt from 'bcrypt';

export type UserData = Omit<UserType, 'passwordHash' | 'state'> & {
  password: string;
  stateId: string;
};

export const signup = async (userData: UserData) => {
  const { email, password, name, stateId } = userData;

  const user = await User.findOne({
    email,
  });

  const stateData = await State.findById(stateId);

  if (user) {
    return new Error('E-mail já cadastrado!');
  }

  if (!stateData) {
    return new Error('Estado inválido!');
  }

  const userCreated = await User.create({
    email,
    passwordHash: bcrypt.hashSync(password, 10),
    name,
    state: stateData?.name,
  });

  return userCreated;
};

export const findByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const matchPassword = (rawPassword: string, encodedPassword: string) => {
  return bcrypt.compareSync(rawPassword, encodedPassword);
};
