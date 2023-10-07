import express, { Response, ErrorRequestHandler } from 'express';
import path from 'path';
import cors from 'cors';
import accessEndpoints from './routes/access';

const server = express();

server.use(cors);

server.use(express.static(path.join(__dirname, '../public')));

server.use(express.urlencoded({ extended: true }));

server.use(accessEndpoints);

server.use((__, res: Response) => {
  res.status(400).json({ error: 'endpoint no encontrado!' });
});

export default server;
