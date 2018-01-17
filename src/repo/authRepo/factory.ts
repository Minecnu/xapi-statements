import connectToDb from 'jscommons/dist/mongoRepo/utils/connectToDb';
import fakeFactory from './utils/fakeAuth/factory';
import fetchFactory from './utils/fetchAuth/factory';
import mongoFactory from './utils/mongoAuth/factory';
import Facade from './Facade';
import FactoryConfig from './FactoryConfig';

export default (config: FactoryConfig): Facade => {
  switch (config.facade) {
    case 'test':
      return fakeFactory(config.fake);
    case 'fetch':
      return fetchFactory(config.fetch);
    default: case 'mongo':
      return mongoFactory(config.mongo);
  }
};