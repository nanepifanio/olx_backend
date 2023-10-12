import { Request, Response } from 'express';
import * as UserService from '../services/User.service';

export const getUserInfo = async (req: Request, res: Response) => {};

export const updateUserInfo = async (req: Request, res: Response) => {};

export const deleteUser = async (req: Request, res: Response) => {};

export const getStates = async (req: Request, res: Response) => {
  const states = await UserService.getAllStates();

  res.json(states);
};
