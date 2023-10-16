import { Router } from 'express';
import * as AdsController from '../controllers/ads.controller';
import { privateRoute } from '../config/passport';
import multer from 'multer';

const upload = multer({
  dest: './tmp',
  fileFilter: (req, file, cb) => {
    const allowedFiles = ['image/jpg', 'image/jpeg', 'image/png'];
    const isAllowed = allowedFiles.includes(file.mimetype);
    cb(null, isAllowed);
  },
  limits: {
    fieldSize: 2000000,
  },
});

const router = Router();

router.post(
  '/ad/add',
  privateRoute,
  upload.array('ad-imgs', 5),
  AdsController.postAd
);
router.get('/ads', AdsController.getAllAds);
router.get('/ad/:id', AdsController.getAd);
router.put('/ad/update', privateRoute, AdsController.updateAd);
router.delete('/ad/delete', privateRoute, AdsController.deleteAd);
router.get('/ads/:categoryId', AdsController.getAdsByCategory);

router.get('/categories', AdsController.getCategories);

export default router;
