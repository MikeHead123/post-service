/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import Promise from 'bluebird';
import config from '../common/constants';

const ClientError = require('../common/error');

const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return next(new ClientError(403, 'No token provided'));
  }

  const jwtVerifyAsync = Promise.promisify(jwt.verify, jwt);

  try {
    const decoded = await jwtVerifyAsync(token, config.SECRET);
    req.authData = decoded;
    next();
  } catch (err) {
    next(new ClientError('Failed to authenticate token', 400));
  }
};

export default verifyToken;
