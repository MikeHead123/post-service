
const app = require('express')();
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');
const postController = require('./controllers/postController');

const port = process.env.PORT || 3000;
(async () => {
  // eslint-disable-next-line global-require
  app.locals.db = await require('./dbConnection')();

  app.use('/api/users', userController);

  app.use('/api/auth', authController);

  app.use('/api/post', postController);

  app.listen(port, () => console.log(`Express server listening on port ${port}`));
})();
