import { checkSchema } from 'express-validator';

export const postAdValidator = checkSchema({
  categoryId: {
    notEmpty: true,
    errorMessage: 'Escolha a categoria do anúncio!',
  },
  description: {
    notEmpty: true,
    isLength: {
      options: { max: 1024 },
    },
    errorMessage: 'Escreva uma descrição para o anúncio!',
  },
  price: {
    notEmpty: true,
    isNumeric: true,
    errorMessage: 'Preço do anúncio não enviado ou incorreto!',
  },
  priceNegotiable: {
    optional: true,
    isBoolean: true,
    errorMessage: 'É esperado um valor boolean para este campo!',
  },
  stateId: {
    notEmpty: true,
    errorMessage: 'Estado do anúncio não enviado!',
  },
  title: {
    notEmpty: true,
    errorMessage: 'Título do anúncio não enviado!',
  },
});
