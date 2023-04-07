const mongoose = require('mongoose');

module.exports = async () => {
  // mongoose.connect(`mongodb://${process.env.DB_HOST || 'localhost'}:27018/postStore?directConnection=true`);
  console.log('start db connection');
  try {
    await mongoose.connect(`mongodb://${process.env.DB_HOST || 'localhost'}:27017/postStore?directConnection=true`, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      readPreference: 'secondaryPreferred',
    });
    console.log('success db connection');
  } catch (err) {
    console.log('DB_CONNECTION_ERROR');
    console.log(err);
  }
};
