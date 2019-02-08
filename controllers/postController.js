const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
const verifyToken = require('./../middleware/verifyToken');

const router = express.Router();
router.use(bodyParser.json());

router.post('/', verifyToken, async (req, res) => {
  try {
    const { db } = req.app.locals;

    const user = await db.collection('users').findOne({ _id: ObjectId(req.body.author) });

    if (user === null) {
      return res.status(404).send('user not found');
    }
    const post = await db.collection('posts').insertOne({
      postTitle: req.body.postTitle,
      postBody: req.body.postBody,
      author: { userId: ObjectId(req.body.author), userName: user.userName },
    });

    await db.collection('users').update(
      { _id: ObjectId(req.body.author) },
      { $push: { posts: post.insertedId } },
    );

    return res.status(200).send({ _id: post.insertedId });
  } catch (err) {
    return res.status(500).send('post save error');
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
    const { db } = req.app.locals;
    const posts = await db.collection('posts').find({}).toArray();

    return res.status(200).send(posts);
  } catch (err) {
    return res.status(500).send('post get error');
  }
});

module.exports = router;
