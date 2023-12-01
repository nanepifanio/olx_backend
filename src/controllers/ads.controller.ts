import { Request, Response } from 'express';
import { matchedData } from 'express-validator/src/matched-data';
import { validationResult } from 'express-validator/src/validation-result';
import * as AdsService from '../services/Ads.service';

export const postAd = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.mapped() });
    return;
  }

  const files = req.files as Express.Multer.File[];
  const { id } = req.user as { id: string };
  const AdData = matchedData(req) as AdsService.AdReqData;

  if (files && files.length) {
    const ad = await AdsService.postAd(files, id, AdData);
    res.json(ad);
    return;
  }

  res.status(400).json({ error: 'Envie pelo menos uma imagem!' });
};

export const getAllAds = async (req: Request, res: Response) => {};

export const getAd = async (req: Request, res: Response) => {};

export const updateAd = async (req: Request, res: Response) => {};

export const deleteAd = async (req: Request, res: Response) => {};

export const getAdsByCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;

  if (categoryId) {
    const ads = await AdsService.getAdsByCategory(categoryId);
    res.json(ads);
    return;
  }

  res.status(400).json(null);
};

export const getCategories = async (req: Request, res: Response) => {
  const ads = await AdsService.getAllCategories();
  res.json(ads);
};
