
const port = process.env.PORT || 3000;
const express = require('express');
require('./dbConnection')();

const app = express();


const userController = require('./controllers/userController');
const authController = require('./controllers/authController');
const postController = require('./controllers/postController');

app.use(express.json());

app.use('/api/users', userController);

app.use('/api/auth', authController);

app.use('/api/post', postController);

app.listen(port, () => console.log(`Express server listening on port ${port}`));
