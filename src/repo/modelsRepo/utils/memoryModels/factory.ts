import { defaultTo } from 'lodash';
import commonMemoryRepo from 'jscommons/dist/memoryRepo';
import Facade from '../../Facade';
import FactoryConfig from './FactoryConfig';
import createStatements from '../../createStatements/memory';
import getFullActivity from '../../getFullActivity/memory';
import getHashes from '../../getHashes/memory';
import getStatement from '../../getStatement/memory';
import getStatements from '../../getStatements/memory';
import getVoidersByObjectIds from '../../getVoidersByObjectIds/memory';
import getVoidersByIds from '../../getVoidersByIds/memory';
import voidStatements from '../../voidStatements/memory';
import getDownRefId from '../../getDownRefId/memory';
import getUpRefIds from '../../getUpRefIds/memory';
import setQueriables from '../../setQueriables/memory';
import getStatementsByIds from '../../getStatementsByIds/memory';
import getUpRefsByIds from '../../getUpRefsByIds/memory';
import updateFullActivities from '../../updateFullActivities/memory';
import incrementStoreCount from '../../incrementStoreCount/memory';
import FacadeConfig, { State as FacadeState } from './FacadeConfig';
import { State as FactoryState } from './FactoryConfig';

export default (config: FactoryConfig = {}): Facade => {
  const factoryState: FactoryState = defaultTo(config.state, {});
  const facadeState: FacadeState = {
    fullActivities: defaultTo(factoryState.fullActivities, []),
    statements: defaultTo(factoryState.statements, []),
  };
  const facadeConfig: FacadeConfig = { state: facadeState };
  return {
    ...commonMemoryRepo(facadeConfig),
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
