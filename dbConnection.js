
const { MongoClient } = require('mongodb');

module.exports = async () => {
  const url = `mongodb://${process.env.DB_HOST || 'localhost'}:27017`;
  const dbName = 'postStore';
  try {
    const client = await MongoClient.connect(url);
    return client.db(dbName);
  } catch (err) {
    throw err;
  }
};
