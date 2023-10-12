import { Request, Response } from 'express';
import { matchedData } from 'express-validator/src/matched-data';
import { validationResult } from 'express-validator/src/validation-result';
import * as AuthService from '../services/Auth.service';
import { generateToken } from '../config/passport';

export const signup = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.mapped() });
    return;
  }

  const userData = matchedData(req) as AuthService.UserData;

  const user = await AuthService.signup(userData);

  if (user instanceof Error) {
    res.status(400).json({ error: user.message });
    return;
  }

  const token = generateToken({ id: user.id, email: user.email });

  res.status(201).json({ token });
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email && password) {
    const user = await AuthService.findByEmail(email);

    if (user) {
      const passwordExists = AuthService.matchPassword(
        password,
        user.passwordHash
      );

      if (passwordExists) {
        const token = generateToken({ id: user.id, email: user.email });

        res.json({ token });
      } else {
        res.status(404).json({ error: 'Senha incorreta!' });
      }
    } else {
      res.status(404).json({ error: 'E-mail não encontrado!' });
    }

    return;
  }

  res.status(400).json({ error: 'E-mail e/ou senha não enviados!' });
};
