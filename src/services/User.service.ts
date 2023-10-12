import { User } from '../models';
import { State } from '../models';

export const getAllStates = async () => {
  return await State.find();
};
