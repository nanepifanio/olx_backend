import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
import { privateRoute } from '../config/passport';
import { updateUserInfoValidator } from '../validators';

const router = Router();

router.get('/user/me', privateRoute, UserController.getUserInfo);

router.put(
  '/user/me',
  privateRoute,
  updateUserInfoValidator,
  UserController.updateUserInfo
);

router.delete('/user/me', privateRoute, UserController.deleteUser);

router.get('/states', UserController.getStates);

export default router;
