import connectToDb from 'jscommons/dist/mongoRepo/utils/connectToDb';
import getDbFromUrl from 'jscommons/dist/mongoRepo/utils/getDbFromUrl';
import { defaultTo } from 'lodash';
import Facade from '../../Facade';
import FactoryConfig from './FactoryConfig';
import getClient from '../../getClient/mongo';
import FacadeConfig from './FacadeConfig';

export default (factoryConfig: FactoryConfig = {}): Facade => {
  const mongoUrl = defaultTo(factoryConfig.url, 'mongodb://localhost:27017/xapistatements');
  const facadeConfig: FacadeConfig = {
    db: connectToDb({
      dbName: defaultTo(factoryConfig.dbName, getDbFromUrl(mongoUrl) as string),
      url: mongoUrl,
    }),
  };
  return {
    getClient: getClient(facadeConfig),
  };
};
