const express = require('express');
const verifyToken = require('./../middleware/verifyToken');
const User = require('./../models/user');

const router = express.Router();

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('posts', '_id postTitle');

    if (user === null) {
      return res.status(404).send('user not found');
    }

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send('search error');
  }
});

module.exports = router;
