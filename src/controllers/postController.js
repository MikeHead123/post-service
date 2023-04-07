const express = require('express');
const verifyToken = require('./../middleware/verifyToken');
const Post = require('./../models/post');
const User = require('./../models/user');

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.author });

    if (user === null) {
      return res.status(404).send('user not found');
    }

    const post = await Post.create({
      postTitle: req.body.postTitle,
      postBody: req.body.postBody,
      author: req.body.author,
    });

    user.posts.push(post._id);
    await user.save();

    return res.status(200).send(post);
  } catch (err) {
    return res.status(500).send('post save error');
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
