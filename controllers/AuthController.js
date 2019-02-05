const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./../models/User');
const config = require('../config');

const router = express.Router();
router.use(bodyParser.json());

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(404).send('user not found');
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400,
    });

    return res.status(200).send({ auth: true, token });
  } catch (err) {
    return res.status(500).send('login error');
  }
});


router.post('/register', async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400,
    });

    return res.status(200).send({ auth: true, token });
  } catch (err) {
    return res.status(500).send('save user problem');
  }
});


module.exports = router;
