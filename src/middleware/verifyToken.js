/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const redis = require('../communicators/redis');
const config = require('../config');
const ClientError = require('../common/error');

const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return next(new ClientError(403, 'No token provided'));
  }

  const jwtVerifyAsync = Promise.promisify(jwt.verify, jwt);

  try {
    const decoded = await jwtVerifyAsync(token, config.secret);
    req.authData = decoded;
    next();
  } catch (err) {
    next(new ClientError(500, 'Failed to authenticate token'));
  }
};

module.exports = verifyToken;
