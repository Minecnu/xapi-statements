import { defaultTo } from 'lodash';
import * as redis from 'redis';
import clearRepo from '../../clearRepo/redis';
import emitNewStatements from '../../emitNewStatements/redis';
import Facade from '../../Facade';
import FactoryConfig from './FactoryConfig';
import FacadeConfig from './FacadeConfig';

export default (factoryConfig: FactoryConfig = {}): Facade => {
  const facadeConfig: FacadeConfig = {
    client: redis.createClient({
      url: defaultTo(factoryConfig.url, 'redis://127.0.0.1:6379/0'),
    }),
    prefix: defaultTo(factoryConfig.prefix, 'xapistatements'),
  };
  return {
    emitNewStatements: emitNewStatements(facadeConfig),
    clearRepo: clearRepo(facadeConfig),
    migrate: async () => { },
    rollback: async () => { },
  };
};
