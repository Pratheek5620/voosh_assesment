import { Router, Request, Response } from 'express';
import User from '../models/User';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
});

export default router;
