import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv-flow';
import Container from 'typedi';
import userController from './controllers/userController';
import authController from './controllers/authController';
import postController from './controllers/postController';
import config from './common/constants';
import MongoConnector from './db/MongoConnector';
import { ClientError, ServerError } from './common/error';
import CustomLogger from './common/logger';

const customLogger = Container.get(CustomLogger);

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/users', userController);

app.use('/api/auth', authController);

app.use('/api/post', postController);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  let error = err;
  if (!(error instanceof ClientError)) {
    customLogger.error('LOGIN_ERROR', error);
    error = new ServerError();
  }

  const message = error.message || null;
  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({ message });
});

const server = app.listen(config.PORT, async () => {
  await MongoConnector.connect();
  customLogger.info(`Express server listening on port ${config.PORT}`);
});

const closeAllConnections = () => {
  customLogger.info('Closing http server.');
  server.close(() => {
    customLogger.info('Http server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => {
  customLogger.info('SIGTERM signal received.');
  closeAllConnections();
});

process.on('SIGINT', () => {
  customLogger.info('SIGINT signal received.');
  closeAllConnections();
});
