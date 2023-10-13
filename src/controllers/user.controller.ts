import { Request, Response } from 'express';
import { matchedData } from 'express-validator/src/matched-data';
import { validationResult } from 'express-validator/src/validation-result';
import * as UserService from '../services/User.service';
import { UserData } from '../services/Auth.service';

export const getUserInfo = async (req: Request, res: Response) => {
  const { id } = req.user as { id: string };
  const userInfo = await UserService.getAllUserInfo(id);
  const userAds = await UserService.getUserAds(id);
  res.json({
    email: userInfo?.email,
    name: userInfo?.name,
    state: userInfo?.state,
    ads: userAds,
  });
};

export const updateUserInfo = async (req: Request, res: Response) => {
  const { id } = req.user as { id: string };
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.mapped() });
    return;
  }

  const userData = matchedData(req) as UserData;

  const user = await UserService.updateUserInfoOrInfos(id, userData);

  if (user instanceof Error) {
    res.status(400).json({ error: user.message });
    return;
  }

  res
    .status(user ? 200 : 404)
    .json(
      user
        ? { message: 'Dados atualizados com sucesso!' }
        : { error: 'Não foi possível atualizar seus dados!' }
    );
};

export const deleteUser = async (req: Request, res: Response) => {};

export const getStates = async (req: Request, res: Response) => {
  const states = await UserService.getAllStates();

  res.json(states);
};
