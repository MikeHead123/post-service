/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import Promise from 'bluebird';
import { Request, Response, NextFunction } from 'express';
import config from '../common/constants';
import ClientError from '../common/error';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return next(new ClientError('No token provided', 403));
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
