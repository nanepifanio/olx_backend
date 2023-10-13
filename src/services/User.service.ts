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

  if (user) {
    if (dataToUpdate.email) {
      const emailExists = await User.findOne({ email: dataToUpdate.email });

      if (emailExists) {
        return new Error('Esse e-mail já está cadastrado!');
      }

      user.email = dataToUpdate.email;
    }

    user.passwordHash = dataToUpdate.password
      ? bcrypt.hashSync(dataToUpdate.password, 10)
      : user.passwordHash;
    user.state = dataToUpdate.state || user.state;
    user.name = dataToUpdate.name || user.name;
  }

  return await user?.save();
};
