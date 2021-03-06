import Statement from '../../../models/Statement';
import matchesClientOption from '../utils/mongoModels/matchesClientOption';
import { decodeDotsInStatement } from '../utils/mongoModels/replaceDotsInStatement';
import { STATEMENTS_COLLECTION_NAME } from '../utils/mongoModels/constants';
import Config from '../utils/mongoModels/Config';
import Signature, { Opts } from './Signature';

interface Result {
  statement: Statement;
}

export default (config: Config): Signature => {
  return async ({ client, ids }) => {
    const collection = (await config.db).collection(STATEMENTS_COLLECTION_NAME);

    const query = {
      'statement.id': { $in: ids },
      ...matchesClientOption(client)
    };

    const project = {
      _id: 0,
      statement: 1,
    };

    const filteredModels = await collection.find(query).project(project).toArray() as Result[];

    const filteredStatements = filteredModels.map((model) => {
      return decodeDotsInStatement(model.statement);
    });
    return filteredStatements;
  };
};
