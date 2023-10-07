import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import JWT from 'jsonwebtoken';
import * as Models from '../models';

dotenv.config();

const notAuthorized = { status: 401, message: 'Acesso não autorizado!' };

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY as string,
};

passport.use(
  new JWTStrategy(options, async (payload, done) => {
    const user = await Models.User.findById(payload.id);

    if (user) {
      return done(null, user);
    }

    return done(notAuthorized, false);
  })
);

export const generateToken = (data: object) => {
  return JWT.sign(data, options.secretOrKey, { expiresIn: '1h' });
};

export const privateRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return passport.authenticate('jwt', (err: Error, user: Models.UserType) => {
    req.user = user;
    return user ? next() : next(notAuthorized);
  })(req, res, next);
};

export default passport;
