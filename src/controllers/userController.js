const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verifyToken = require('./../middleware/verifyToken');
const User = require('./../models/user');
const config = require('../config');
const checkUserParams = require('./../middleware/checkUserParams');

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

router.post('/register', checkUserParams, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 8);

    const checkExistsUser = await User.findOne({ email: req.body.email });

    if (checkExistsUser !== null) {
      return res.status(303).send('user already exists');
    }

    const user = await User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    });

    const token = jwt.sign({ user }, config.secret, {
      expiresIn: 86400,
    });

    return res.status(200).send({ auth: true, token, userId: user._id });
  } catch (err) {
    return res.status(500).send('save user problem');
  }
});

module.exports = router;
