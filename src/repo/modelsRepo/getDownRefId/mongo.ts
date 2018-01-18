import NoModel from 'jscommons/dist/errors/NoModel';
import Signature, { Opts } from './Signature';
import matchesClientOption from '../utils/mongoModels/matchesClientOption';
import FacadeConfig from '../utils/mongoModels/FacadeConfig';
import { STATEMENTS_COLLECTION_NAME } from '../utils/mongoModels//constants';

interface Result {
  statement: {
    object: {
      id: string;
    }
  };
}

export default (config: FacadeConfig): Signature => {
  return async ({ client, id }) => {
    const collection = (await config.db).collection(STATEMENTS_COLLECTION_NAME);

    const query = {
      'statement.object.objectType': 'StatementRef',
      'statement.id': id,
      ...matchesClientOption(client)
    };
    const queryOptions = {
      fields: {
        _id: 0,
        'statement.object.id': 1,
      }
    };
    const result = await collection.findOne(query, queryOptions) as Result | null;

    if (result === null) {
      throw new NoModel('Statement');
    }

    return result.statement.object.id;
  };
};
