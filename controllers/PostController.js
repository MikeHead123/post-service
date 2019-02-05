const express = require('express');
const bodyParser = require('body-parser');
const verifyToken = require('./../middleware/VerifyToken');
const Post = require('./../models/Post');
const User = require('./../models/User');

const router = express.Router();
router.use(bodyParser.json());

router.post('/', verifyToken, async (req, res) => {
  try {
    const post = await Post.create({
      postTitle: req.body.postTitle,
      postBody: req.body.postBody,
      author: req.body.author,
    });

    const user = await User.findOne({ _id: req.body.author });
    user.posts.push(post._id);
    await user.save();

    if (!post) return res.status(404).send('post not found');
    return res.status(200).send(post);
  } catch (err) {
    return res.status(500).send('post save error');
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
    const post = await Post.find({}).populate('author', '_id userName');
    if (!post) return res.status(404).send('posts not found');
    return res.status(200).send(post);
  } catch (err) {
    return res.status(500).send('post get error');
  }
});

module.exports = router;
