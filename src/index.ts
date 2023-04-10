import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv-flow';
import userController from './controllers/userController';
import authController from './controllers/authController';
import postController from './controllers/postController';
import config from './common/constants';
import MongoConnector from './db/MongoConnector';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/users', userController);

app.use('/api/auth', authController);

app.use('/api/post', postController);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  let error = err;
  if (!(error instanceof Error)) error = new Error(err);

  const message = err.message || null;
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({ message });
});

app.listen(config.PORT, async () => {
  await MongoConnector.connect();
  console.log(`Express server listening on port ${config.PORT}`);
});
