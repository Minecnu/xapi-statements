import NoModel from 'jscommons/dist/errors/NoModel';
import StoredStatementModel from '../../../models/StoredStatementModel';
import matchesClientOption from '../utils/mongoModels/matchesClientOption';
import { decodeDotsInStatement } from '../utils/mongoModels/replaceDotsInStatement';
import FacadeConfig from '../utils/mongoModels/FacadeConfig';
import { STATEMENTS_COLLECTION_NAME } from '../utils/mongoModels/constants';
import Signature, { Opts } from './Signature';

export default (config: FacadeConfig): Signature => {
  return async ({ client, id, voided }) => {
    const collection = (await config.db).collection(STATEMENTS_COLLECTION_NAME);
    const query = {
      'statement.id': id,
      ...matchesClientOption(client, true),
      ...(voided === undefined ? {} : { voided }),
    };

    const filteredModel = await collection.findOne(query) as StoredStatementModel;

    if (filteredModel === null) {
      throw new NoModel('Statement');
    }

    const decodedModel = {
      ...filteredModel,
      statement: decodeDotsInStatement(filteredModel.statement),
    };
    return decodedModel;
  };
};
