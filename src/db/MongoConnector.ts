import { connect } from 'mongoose';
import Container from 'typedi';
import config from '../common/constants';
import CustomLogger from '../common/logger';

const customLogger = Container.get(CustomLogger);
export default class MongoConnector {
  static async connect() {
    customLogger.info('START_DB_CONNECTION');
    try {
      await connect(`mongodb://${config.DB_HOST}:${config.DB_PORT}/postStore?directConnection=true`, {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        readPreference: 'secondaryPreferred',
      });
      customLogger.info('SUCCESS_DB_CONNECTION');
    } catch (err) {
      customLogger.error('DB_CONNECTION_ERROR', JSON.stringify(err));
      process.exit(1);
    }
  }
}
