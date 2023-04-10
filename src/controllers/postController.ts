import verifyToken from '../middleware/verifyToken';

import express, { Request, Response, NextFunction } from 'express';

const Post = require('../models/post');
const User = require('../models/user');
const ClientError = require('../common/error');

const router = express.Router();

router.use(verifyToken);

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ _id: req.body.author }).lean();

    if (!user) {
      throw new ClientError('User not found', 404);
    }

    const post = await Post.create({
      postTitle: req.body.postTitle,
      postBody: req.body.postBody,
      author: req.body.author,
    });

    res.status(200).send(post);
  } catch (err) {
    next(new ClientError(500, 'server error'));
  }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await Post.find({
      author: req.query.author,
    }).populate('author', '_id name');

    res.status(200).send(post);
  } catch (err) {
    next(new ClientError(500, 'server error'));
  }
});

export default router;
