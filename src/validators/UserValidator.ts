import { checkSchema } from 'express-validator';

export const updateUserInfoValidator = checkSchema({
  email: {
    trim: true,
    optional: true,
    isEmail: true,
    errorMessage: 'Digite um e-mail válido!',
  },
  password: {
    trim: true,
    optional: true,
    isLength: {
      options: { min: 8 },
    },
    errorMessage: 'A senha precisa ter pelo menos 8 caracteres!',
  },
  state: {
    optional: true,
    errorMessage: 'Escolha um estado!',
  },
  name: {
    trim: true,
    optional: true,
    isLength: {
      options: { min: 2 },
    },
    errorMessage: 'O nome precisa ter pelo menos 2 caracteres!',
  },
});
