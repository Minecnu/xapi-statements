import connectToDb from 'jscommons/dist/mongoRepo/utils/connectToDb';
import getDbFromUrl from 'jscommons/dist/mongoRepo/utils/getDbFromUrl';
import commonMongoRepo from 'jscommons/dist/mongoRepo';
import { defaultTo } from 'lodash';
import Facade from '../../Facade';
import FactoryConfig from './FactoryConfig';
import FacadeConfig from './FacadeConfig';
import createStatements from '../../createStatements/mongo';
import getFullActivity from '../../getFullActivity/mongo';
import getHashes from '../../getHashes/mongo';
import getStatement from '../../getStatement/mongo';
import getStatements from '../../getStatements/mongo';
import getVoidersByObjectIds from '../../getVoidersByObjectIds/mongo';
import getVoidersByIds from '../../getVoidersByIds/mongo';
import voidStatements from '../../voidStatements/mongo';
import getDownRefId from '../../getDownRefId/mongo';
import getUpRefIds from '../../getUpRefIds/mongo';
import setQueriables from '../../setQueriables/mongo';
import getStatementsByIds from '../../getStatementsByIds/mongo';
import getUpRefsByIds from '../../getUpRefsByIds/mongo';
import updateFullActivities from '../../updateFullActivities/mongo';
import incrementStoreCount from '../../incrementStoreCount/mongo';

export default (factoryConfig: FactoryConfig = {}): Facade => {
  const mongoUrl = defaultTo(factoryConfig.url, 'mongodb://localhost:27017/xapistatements');
  const facadeConfig: FacadeConfig = {
    db: connectToDb({
      dbName: defaultTo(factoryConfig.dbName, getDbFromUrl(mongoUrl) as string),
      url: mongoUrl,
    }),
  };
  return {
    ...commonMongoRepo(facadeConfig),
    createStatements: createStatements(facadeConfig),
    getFullActivity: getFullActivity(facadeConfig),
    getHashes: getHashes(facadeConfig),
    getStatement: getStatement(facadeConfig),
    getStatements: getStatements(facadeConfig),
    getVoidersByObjectIds: getVoidersByObjectIds(facadeConfig),
    getVoidersByIds: getVoidersByIds(facadeConfig),
    voidStatements: voidStatements(facadeConfig),
    getDownRefId: getDownRefId(facadeConfig),
    getUpRefIds: getUpRefIds(facadeConfig),
    setQueriables: setQueriables(facadeConfig),
    getStatementsByIds: getStatementsByIds(facadeConfig),
    getUpRefsByIds: getUpRefsByIds(facadeConfig),
    updateFullActivities: updateFullActivities(facadeConfig),
    incrementStoreCount: incrementStoreCount(facadeConfig),
  };
};
