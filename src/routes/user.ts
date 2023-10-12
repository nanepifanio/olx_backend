import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
import { privateRoute } from '../config/passport';

const router = Router();

router.get('/user/me', privateRoute, UserController.getUserInfo);
router.put('/user/me', privateRoute, UserController.updateUserInfo);
router.delete('/user/me', privateRoute, UserController.deleteUser);

router.get('/states', UserController.getStates);

export default router;
