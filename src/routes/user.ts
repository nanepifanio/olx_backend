import { Router } from 'express';
import * as UserController from '../controllers/user.controller';

const router = Router();

router.get('/user/me', UserController.getUserInfo);
router.put('/user/me', UserController.updateUserInfo);
router.delete('/user/me', UserController.deleteUser);

export default router;
