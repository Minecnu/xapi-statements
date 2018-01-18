import Signature, { Opts } from './Signature';
import matchesClientOption from '../utils/mongoModels/matchesClientOption';
import FacadeConfig from '../utils/mongoModels/FacadeConfig';
import { STATEMENTS_COLLECTION_NAME } from '../utils/mongoModels/constants';

interface Result {
  statement: {
    id: string;
  };
}

export default (config: FacadeConfig): Signature => {
  return async ({ client, id }) => {
    const collection = (await config.db).collection(STATEMENTS_COLLECTION_NAME);
    const query = {
      'statement.object.objectType': 'StatementRef',
      'statement.object.id': id,
      ...matchesClientOption(client)
    };
    const project = {
      _id: 0,
      'statement.id': 1,
    };

    const results = await collection.find(query).project(project).toArray() as Result[];

    return results.map((result) => {
      return result.statement.id;
    });
  };
};
