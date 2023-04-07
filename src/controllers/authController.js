const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./../models/user');
const config = require('../config');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user === null) {
      return res.status(404).send('user not found');
    }

    const passwordIsValid = await bcrypt.compare(req.body.password, user.password);

    if (passwordIsValid === false) {
      return res.status(401).send('password or login is not valid');
    }

    const token = jwt.sign({ user }, config.secret, {
      expiresIn: 86400,
    });

    return res.status(200).send({ auth: true, token, userId: user._id });
  } catch (err) {
    return res.status(500).send('login error');
  }
});

module.exports = router;
