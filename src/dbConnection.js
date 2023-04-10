const mongoose = require('mongoose');

module.exports = async () => {
  console.log('start db connection');
  try {
    await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/postStore?directConnection=true`, {
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
