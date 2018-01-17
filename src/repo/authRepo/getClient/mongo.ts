import * as atob from 'atob';
import { ObjectID } from 'mongodb';
import NoModel from 'jscommons/dist/errors/NoModel';
import ClientModel from '../../../models/ClientModel';
import Signature, { Opts, Result } from './Signature';
import Actor from '../../../models/Actor';
import FacadeConfig from '../utils/mongoAuth/FacadeConfig';
import parseJson from '../../../utils/parseJson';

export default (config: FacadeConfig): Signature => {
  return async ({ authToken }) => {
    const strippedAuthToken = authToken.replace('Basic ', '');
    const decodedAuthToken = atob(strippedAuthToken);
    const splitAuthToken = decodedAuthToken.split(':');
    const [key, secret] = splitAuthToken;
    const document = await (await config.db).collection('client').findOne({
      'api.basic_key': key,
      'api.basic_secret': secret,
    });

    const isMissingClient = (
      document === null ||
      document === undefined ||
      !(document.lrs_id instanceof ObjectID)
    );
    if (isMissingClient) {
      throw new NoModel('Client');
    }

    const client: ClientModel = {
      _id: document._id.toString() as string,
      title: document.title as string,
      authority: parseJson(document.authority, ['client', 'authority']) as Actor,
      isTrusted: document.isTrusted as boolean,
      lrs_id: document.lrs_id.toString() as string,
      organisation: document.organisation.toString() as string,
      scopes: document.scopes as string[],
    };

    return { client };
  };
};
