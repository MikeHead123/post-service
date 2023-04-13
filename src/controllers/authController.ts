import express, { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import CustomLogger from '../common/logger';
import AuthService from '../services/auth';

const customLogger = Container.get(CustomLogger);

const router = express.Router();

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authService = Container.get(AuthService);

    const { token, userId } = await authService.login({ email: req.body.email, password: req.body.password });

    res.status(200).send({ auth: true, token, userId });
  } catch (err) {
    customLogger.error('LOGIN_ERROR', JSON.stringify(err));
    next(err);
  }
});

export default router;
