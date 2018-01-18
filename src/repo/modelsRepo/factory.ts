import connectToDb from 'jscommons/dist/mongoRepo/utils/connectToDb';
import memoryFactory from './utils/memoryModels/factory';
import mongoFactory from './utils/mongoModels/factory';
import Facade from './Facade';
import FactoryConfig from './FactoryConfig';

export default (config: FactoryConfig): Facade => {
  switch (config.facade) {
    case 'mongo':
      return mongoFactory(config.mongo);
    default: case 'memory':
      return memoryFactory(config.memory);
  }
};
