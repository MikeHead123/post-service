const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const config = require('../config');

const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (token === undefined) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  const jwtVerifyAsync = Promise.promisify(jwt.verify, jwt);

  try {
    const decoded = await jwtVerifyAsync(token, config.secret);
    req.authData = decoded;
    return next();
  } catch (err) {
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
  }
};

module.exports = verifyToken;
