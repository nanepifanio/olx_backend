import { Router } from 'express';
import * as CategoryController from '../controllers/category.controller';

const router = Router();

router.get('./categories', CategoryController.getCategories);

export default router;
