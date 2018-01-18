import * as redis from 'redis';
import fakeFactory from './utils/fakeEvents/factory';
import redisFactory from './utils/redisEvents/factory';
import Facade from './Facade';
import FactoryConfig from './FactoryConfig';

export default (config: FactoryConfig): Facade => {
  switch (config.facade) {
    case 'test':
      return fakeFactory();
    default: case 'redis':
      return redisFactory(config.redis);
  }
};
