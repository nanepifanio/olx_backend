import bcrypt from 'bcrypt';
import { User, State, Ad } from '../models';
import { UserData } from './Auth.service';

export const getAllStates = async () => {
  return await State.find();
};

export const getAllUserInfo = async (id: string) => {
  return await User.findById(id);
};

export const getUserAds = async (id: string) => {
  return await Ad.find({ idUser: id });
};

export const updateUserInfoOrInfos = async (
  id: string,
  dataToUpdate: UserData
) => {
  const user = await User.findById(id);
  const { stateId, name, email, password } = dataToUpdate;

  if (user) {
    if (email) {
      const emailExists = await User.findOne({ email });

      if (emailExists) {
        return new Error('Esse e-mail já existe na nossa base de dados!');
      }

      user.email = email;
    }

    if (password) {
      const isEqualToPreviousPassword = bcrypt.compareSync(
        password,
        user.passwordHash
      );

      if (isEqualToPreviousPassword) {
        return new Error('Essa é sua senha atual, escolha outra!');
      }

      user.passwordHash = bcrypt.hashSync(password, 10);
    }

    if (stateId) {
      const state = await State.findById(stateId);

      if (!state) {
        return new Error('Estado inválido!');
      }

      user.state = state?.name as string;
    }

    if (name) {
      user.name = name;
    }
  }

  return await user?.save();
};

export const deleteUser = async (id: string) => {
  const user = await User.findById(id);

  return await user?.deleteOne();
};
