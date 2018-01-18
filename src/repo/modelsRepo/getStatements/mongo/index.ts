import StoredStatementModel from '../../../../models/StoredStatementModel';
import Signature, { Opts } from '../Signature';
import matchesClientOption from '../../utils/mongoModels/matchesClientOption';
import { decodeDotsInStatement } from '../../utils/mongoModels/replaceDotsInStatement';
import { STATEMENTS_COLLECTION_NAME } from '../../utils/mongoModels/constants';
import FacadeConfig from '../../utils/mongoModels/FacadeConfig';
import matchesAgentOption from './matchesAgentOption';
import matchesCursorOption from './matchesCursorOption';
import matchesVerbOption from './matchesVerbOption';
import matchesActivityOption from './matchesActivityOption';
import matchesRegistrationOption from './matchesRegistrationOption';
import matchesUntilOption from './matchesUntilOption';
import matchesSinceOption from './matchesSinceOption';

const filterModels = (opts: Opts): Object => {
  return {
    $and: [
      { voided: false },
      matchesCursorOption(opts),
      matchesClientOption(opts.client, true),
      matchesAgentOption(opts),
      matchesVerbOption(opts),
      matchesActivityOption(opts),
      matchesRegistrationOption(opts),
      matchesUntilOption(opts),
      matchesSinceOption(opts),
    ]
  };
};

const sortModels = (ascending: boolean) => {
  return {
    stored: ascending ? 1 : -1,
    _id: -1,
  };
};

export default (config: FacadeConfig): Signature => {
  return async (opts) => {
    const collection = (await config.db).collection(STATEMENTS_COLLECTION_NAME);
    const query = filterModels(opts);
    const sort = sortModels(opts.ascending);
    const skip = opts.skip || 0;
    const limit = opts.limit;

    const models = await collection
      .find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .toArray() as StoredStatementModel[];

    const decodedModels = models.map((model) => {
      const statement = decodeDotsInStatement(model.statement);
      return { ...model, statement };
    });

    return decodedModels;
  };
};
