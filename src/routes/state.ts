import Router from 'express';
import * as StateController from '../controllers/state.controller';

const router = Router();

router.get('/states', StateController.getStates);

export default router;
