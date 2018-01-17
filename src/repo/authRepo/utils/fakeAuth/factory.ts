import Facade from '../../Facade';
import FactoryConfig from './FactoryConfig';
import getClient from '../../getClient/fake';
import FacadeConfig from './FacadeConfig';

export default (_factoryConfig: FactoryConfig = {}): Facade => {
  const facadeConfig: FacadeConfig = {};
  return {
    getClient: getClient(facadeConfig),
  };
};
