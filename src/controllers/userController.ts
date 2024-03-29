import { Container } from 'typedi';
import express, { Request, Response, NextFunction } from 'express';
import UserService from '../services/user';
import verifyToken from '../middleware/verifyToken';
import validate from '../middleware/validate';
import createUserSchema from '../schemas/user';
import { ClientError } from '../common/error';
import JwtSignerService from '../services/jwtSigner';

const router = express.Router();

router.get('/:id', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userService = Container.get(UserService);
    const user = await userService.getById(req.params.id);

    if (!user) {
      throw new ClientError('User not found', 404);
    }

    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
});

router.post('/register', validate(createUserSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userService = Container.get(UserService);
    const jwtSignerService = Container.get(JwtSignerService);

    const user = await userService.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const token = jwtSignerService.sign(user);

    res.status(200).send({ auth: true, token, userId: user._id });
  } catch (err) {
    next(err);
  }
});

export default router;
