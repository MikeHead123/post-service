
const port = process.env.PORT || 3000;
const app = require('express')();
require('./dbConnection')();

const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');
const PostController = require('./controllers/PostController');

app.use('/api/users', UserController);

app.use('/api/auth', AuthController);

app.use('/api/post', PostController);

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
