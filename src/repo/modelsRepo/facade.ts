import connectToDb from 'jscommons/dist/mongoRepo/utils/connectToDb';
import memoryModelsRepo from './utils/memoryModels/facade';
import mongoModelsRepo from './utils/mongoModels/facade';
import Repo from './Repo';
import Config from './Config';

export default (config: Config): Repo => {
  switch (config.facade) {
    case 'mongo':
      return mongoModelsRepo({
        db: connectToDb({
          dbName: config.mongo.dbName,
          url: config.mongo.url,
        }),
      });
    default: case 'memory':
      return memoryModelsRepo(config.memory);
  }
};
