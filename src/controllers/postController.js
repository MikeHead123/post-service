import verifyToken from '../middleware/verifyToken';

const express = require('express');

const Post = require('../models/post');
const User = require('../models/user');
const ClientError = require('../common/error');

const router = express.Router();

router.post('/', verifyToken, async (req, res, next) => {
  const user = await User.findOne({ _id: req.body.author });

  if (!user) {
    return next(new ClientError(404, 'user not found'));
  }

  try {
    const post = await Post.create({
      postTitle: req.body.postTitle,
      postBody: req.body.postBody,
      author: req.body.author,
    });

    user.posts.push(post._id);
    await user.save();

    return res.status(200).send(post);
  } catch (err) {
    console.log(err);
    next(new ClientError(500, 'server error'));
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
    const post = await Post.find({}).populate('author', '_id userName');

    return res.status(200).send(post);
  } catch (err) {
    return res.status(500).send('post get error');
  }
});

module.exports = router;
