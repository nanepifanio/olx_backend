import { Request, Response } from 'express';
import * as AdsService from '../services/Ads.service';

export const postAd = async (req: Request, res: Response) => {};

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
