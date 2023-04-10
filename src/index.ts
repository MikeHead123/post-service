import 'reflect-metadata';
import express from 'express';
import userController from './controllers/userController';
import authController from './controllers/authController';
import postController from './controllers/postController';

require('dotenv-flow').config();

require('./dbConnection')();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/api/users', userController);

app.use('/api/auth', authController);

app.use('/api/post', postController);

app.use((err, req, res, next) => {
  let error = err;
  if (!(error instanceof Error)) error = new Error(err);

  const message = err.message || null;
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({ message });
});

app.listen(port, () => console.log(`Express server listening on port ${port}`));
