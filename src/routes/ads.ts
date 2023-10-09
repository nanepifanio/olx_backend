import { Router } from 'express';
import * as AdsController from '../controllers/ads.controller';

const router = Router();

router.post('./ad/add', AdsController.postAd);
router.get('./ad/list', AdsController.getAllAds);
router.get('./ad/:id', AdsController.getAd);
router.put('./ad/update', AdsController.updateAd);
router.delete('./ad/delete', AdsController.deleteAd);

export default router;
