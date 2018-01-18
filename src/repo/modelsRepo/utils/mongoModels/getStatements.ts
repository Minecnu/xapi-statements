import ClientModel from '../../../../models/ClientModel';
import matchesClientOption from './matchesClientOption';
import { STATEMENTS_COLLECTION_NAME } from './constants';
import FacadeConfig from './FacadeConfig';

export interface Options {
  config: FacadeConfig;
  query: Object;
  project: Object;
  client: ClientModel;
}

export default async ({ config, query, project, client }: Options) => {
  const collection = (await config.db).collection(STATEMENTS_COLLECTION_NAME);
  const orgQuery = {
    ...query,
    ...matchesClientOption(client)
  };
  const results = await collection.find(orgQuery).project(project).toArray();
  return results;
};
