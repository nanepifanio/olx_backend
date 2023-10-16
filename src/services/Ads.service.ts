import { Ad, Category } from '../models';

export const getAllCategories = async () => {
  return await Category.find();
};

export const getAdsByCategory = async (catId: string) => {
  return await Ad.find({ category: catId });
};
