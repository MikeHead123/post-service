const express = require('express');
const { ObjectId } = require('mongodb');
const verifyToken = require('./../middleware/verifyToken');

const router = express.Router();

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { db } = req.app.locals;
    const user = await db.collection('users').aggregate([{ $match: { _id: ObjectId(req.params.id) } },
      {
        $lookup: {
          from: 'posts',
          localField: 'posts',
          foreignField: '_id',
          as: 'posts',
        },
      },
      {
        $project: {
          _id: 1,
          userName: 1,
          email: 1,
          password: 1,
          'posts.postTitle': 1,
          'posts._id': 1,
        },
      },
    ]).toArray();

    if (user === null) {
      return res.status(404).send('user not found');
    }

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send('search error');
  }
});

module.exports = router;
