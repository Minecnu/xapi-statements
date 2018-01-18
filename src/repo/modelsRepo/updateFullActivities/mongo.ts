import { mapKeys, Dictionary } from 'lodash';
import { ObjectID } from 'mongodb';
import FacadeConfig from '../utils/mongoModels/FacadeConfig';
import matchesFullActivity from '../utils/mongoModels/matchesFullActivity';
import { replaceDotsInExtensions } from '../utils/mongoModels/replaceDotsInStatement';
import { FULL_ACTIVITIES_COLLECTION_NAME } from '../utils/mongoModels/constants';
import Signature, { Opts } from './Signature';

const getPatchUpdate = <T>(patch: Dictionary<T>, parentKeys: string[]) => {
  return mapKeys<T>(patch, (_value, key) => {
    const parentPath = parentKeys.join('.');
    return `${parentPath}.${key}`;
  });
};

export default (config: FacadeConfig): Signature => {
  return async ({ client, updates }) => {
    const collection = (await config.db).collection(FULL_ACTIVITIES_COLLECTION_NAME);
    const lrsId = new ObjectID(client.lrs_id);
    const organisationId = new ObjectID(client.organisation);
    const batch = collection.initializeUnorderedBulkOp();

    updates.forEach((update) => {
      const activityId = update.activityId;
      const extensions = replaceDotsInExtensions(/\./g, '&46;')(update.extensions);
      const mongoQuery = matchesFullActivity({ activityId, lrsId, organisationId });
      const mongoUpdate = {
        $set: {
          ...getPatchUpdate(update.name, ['name']),
          ...getPatchUpdate(update.description, ['description']),
          ...getPatchUpdate(extensions, ['extensions']),
          ...(update.moreInfo !== undefined ? { moreInfo: update.moreInfo } : {}),
          ...(update.type !== undefined ? { type: update.type } : {}),
        },
      };

      batch.find(mongoQuery).upsert().updateOne(mongoUpdate);
    });

    if (updates.length > 0) {
      await batch.execute();
    }
  };
};
