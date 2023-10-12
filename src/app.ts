import express, { Response, ErrorRequestHandler } from 'express';
import path from 'path';
import cors from 'cors';
import passport from 'passport';
import { MulterError } from 'multer';
import { mongoConnect } from './database/mongo';
import * as ApiRoutes from './routes';

mongoConnect();

const server = express();

server.use(cors());

server.use(express.static(path.join(__dirname, '../public')));

server.use(express.urlencoded({ extended: true }));

server.use(passport.initialize());

server.use(ApiRoutes.authRoutes);
server.use(ApiRoutes.userRoutes);
server.use(ApiRoutes.adsRoutes);

server.use((__, res: Response) => {
  res.status(400).json({ error: 'endpoint não encontrado!' });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status ?? 400);

  if (err instanceof MulterError) {
    res.json({ error: err.code });
    return;
  }

  res.json({ error: err.message ?? 'ocorreu algum erro!' });
};

server.use(errorHandler);

export default server;
