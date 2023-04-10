import express, { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../common/constants';
import ClientError from '../common/error';
/* eslint-disable no-underscore-dangle */

const User = require('../models/user');

const router = express.Router();

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      throw new ClientError('User not found', 404);
    }

    const passwordIsValid = await bcrypt.compare(req.body.password, user.password);

    if (!passwordIsValid) {
      throw new ClientError('Password or login is not valid', 401);
    }

    const token = jwt.sign({ user }, config.SECRET, {
      expiresIn: 86400,
    });

    res.status(200).send({ auth: true, token, userId: user._id });
  } catch (err) {
    throw new ClientError('Login error', 500);
  }
});

export default router;
