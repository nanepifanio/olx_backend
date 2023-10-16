import { checkSchema } from 'express-validator';

export const signupValidator = checkSchema({
  name: {
    trim: true,
    isLength: {
      options: { min: 2 },
    },
    errorMessage: 'O nome precisa ter pelo menos 2 caracteres!',
  },
  email: {
    notEmpty: true,
    isEmail: true,
    normalizeEmail: true,
    errorMessage: 'E-mail inválido!',
  },
  password: {
    isLength: {
      options: { min: 8 },
    },
    errorMessage: 'A senha precisa ter pelo menos 8 caracteres!',
  },
  stateId: {
    notEmpty: true,
    errorMessage: 'Escolha um estado!',
  },
});
