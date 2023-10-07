import { Router, Response } from 'express';

const router = Router();

router.get('/ping', (__, res: Response) => {
  res.json({ pong: true });
});

export default router;
