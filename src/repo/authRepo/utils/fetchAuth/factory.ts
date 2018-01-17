import { defaultTo } from 'lodash';
import Facade from '../../Facade';
import FactoryConfig from './FactoryConfig';
import getClient from '../../getClient/fetch';
import FacadeConfig from './FacadeConfig';

export default (factoryConfig: FactoryConfig = {}): Facade => {
  const facadeConfig: FacadeConfig = {
    llClientInfoEndpoint: defaultTo(factoryConfig.llClientInfoEndpoint, `http://localhost/auth`),
  };
  return {
    getClient: getClient(facadeConfig),
  };
};
