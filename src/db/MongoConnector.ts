import { connect } from 'mongoose';
import config from '../common/constants';

export default class MongoConnector {
  static async connect() {
    console.log('start db connection');
    try {
      await connect(`mongodb://${config.DB_HOST}:${config.DB_PORT}/postStore?directConnection=true`, {
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
  }
}
