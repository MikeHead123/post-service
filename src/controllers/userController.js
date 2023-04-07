const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('./../middleware/verifyToken');
const User = require('./../models/user');
const config = require('../config');

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

router.post('/', async (req, res) => {
  try {
    const token = jwt.sign({ foo: 'bar' }, config.secret);
    const data = {
      ...req.body,
      token,
    };
    const user = await User.create(data);
    res.status(201).send(user);
  } catch (err) {
    res.status(500).send('server error');
  }
});

module.exports = router;
