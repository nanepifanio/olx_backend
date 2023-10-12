import { Router } from 'express';
import * as AdsController from '../controllers/ads.controller';
import { privateRoute } from '../config/passport';

const router = Router();

router.post('./ad/add', privateRoute, AdsController.postAd);
router.get('./ad/list', privateRoute, AdsController.getAllAds);
router.get('./ad/:id', privateRoute, AdsController.getAd);
router.put('./ad/update', privateRoute, AdsController.updateAd);
router.delete('./ad/delete', privateRoute, AdsController.deleteAd);

router.get('./categories', AdsController.getCategories);

export default router;
