import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';
import { signupValidator } from '../validators';

const router = Router();

router.post('/signup', signupValidator, AuthController.signup);
router.post('/signin', AuthController.signin);

export default router;
