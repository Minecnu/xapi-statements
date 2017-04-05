import { Repo } from '../repo';
import Config from './Config';
import clearRepo from './clearRepo';
import createStatements from './createStatements';
import getHashes from './getHashes';
import getStatement from './getStatement';
import getStatements from './getStatements';
import getVoidersByObjectIds from './getVoidersByObjectIds';
import getVoidersByIds from './getVoidersByIds';
import voidStatements from './voidStatements';

export default (config: Config): Repo => {
  return {
    createStatements: createStatements(config),
    getHashes: getHashes(config),
    getStatement: getStatement(config),
    getStatements: getStatements(config),
    getVoidersByObjectIds: getVoidersByObjectIds(config),
    getVoidersByIds: getVoidersByIds(config),
    voidStatements: voidStatements(config),

    clearRepo: clearRepo(config),
    migrate: () => Promise.resolve(),
    rollback: () => Promise.resolve(),
  };
};
