import connectToDb from 'jscommons/dist/mongoRepo/utils/connectToDb';
import fakeAuthRepo from './utils/fakeAuth/facade';
import fetchAuthRepo from './utils/fetchAuth/facade';
import mongoAuthRepo from './utils/mongoAuth/facade';
import Repo from './Repo';
import Config from './Config';

export default (config: Config): Repo => {
  switch (config.facade) {
    case 'test':
      return fakeAuthRepo(config.fake);
    case 'fetch':
      return fetchAuthRepo(config.fetch);
    default: case 'mongo':
      return mongoAuthRepo({
        db: connectToDb({
          dbName: config.mongo.dbName,
          url: config.mongo.url,
        }),
      });
  }
};
