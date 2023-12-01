import { Ad, AdType, Category } from '../models';
import sharp from 'sharp';
import { unlink } from 'fs/promises';

export type AdReqData = Omit<
  AdType,
  | 'dateCreated'
  | 'idUser'
  | 'views'
  | 'category'
  | 'state'
  | 'images'
  | 'status'
> & { categoryId: string; stateId: string };

export const getAllCategories = async () => {
  return await Category.find();
};

export const getAdsByCategory = async (catId: string) => {
  return await Ad.find({ category: catId });
};

export const postAd = async (
  files: Express.Multer.File[],
  userId: string,
  reqData: AdReqData
) => {
  const { categoryId, description, price, priceNegotiable, stateId, title } =
    reqData;
  const images: { url: string; default: boolean }[] = [];

  for (let index in files) {
    const url = `./public/imgs/${files[index].filename}.jpg`;

    await sharp(files[index].path)
      .resize(300, 300, { fit: sharp.fit.contain })
      .toFormat('jpeg')
      .toFile(url);

    images.push({
      url,
      default: +index === 0 ?? false,
    });

    await unlink(files[index].path);
  }

  return await Ad.create({
    category: categoryId,
    description,
    price,
    priceNegotiable,
    state: stateId,
    title,
    idUser: userId,
    dateCreated: new Date(),
    images,
  });
};
