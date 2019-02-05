
const port = process.env.PORT || 3000;
const app = require('express')();
require('./dbConnection')();

const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');

app.use('/api/users', UserController);

app.use('/api/auth', AuthController);

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
