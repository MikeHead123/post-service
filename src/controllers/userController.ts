import { Service, Inject, Container } from 'typedi';
import express from 'express';
import jwt from 'jsonwebtoken';
import UserService from '../services/user';
import verifyToken from '../middleware/verifyToken';
import config from '../common/constants';

const checkUserParams = require('../middleware/checkUserParams');

const router = express.Router();
const userService = Container.get(UserService);

router.get('/:id', verifyToken, async (req, res, next) => {
  try {
    const user = await userService.get(req.params.id);

    if (!user) {
      return res.status(404).send('user not found');
    }

    return res.status(200).send(user);
  } catch (err) {
    next(err);
  }
});

router.post('/register', checkUserParams, async (req, res, next) => {
  try {
    const user = await userService.create({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });

    const token = jwt.sign({ user }, config.SECRET, {
      expiresIn: 86400,
    });

    res.status(200).send({ auth: true, token, userId: user._id });
  } catch (err) {
    console.log('rew rwe rw e');
    console.log(err);
    next(err);
  }
});

module.exports = router;
