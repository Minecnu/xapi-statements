import { Response } from 'express';
import MissingStatementId from '../../errors/MissingStatementId';
import UnequalStatementId from '../../errors/UnequalStatementId';
import AttachmentModel from '../../models/AttachmentModel';
import ClientModel from '../../models/ClientModel';
import Config from '../Config';

const XAPI_VERSION = '1.0.0';

interface Options {
  config: Config;
  body: any;
  attachments: AttachmentModel[];
  client: ClientModel;
  queryParams: any;
  res: Response;
}

export default async ({ config, body, attachments, client, queryParams, res }: Options) => {
  const statementId = queryParams.statementId;
  if (statementId === undefined) {
    throw new MissingStatementId();
  }
  if (body.id !== undefined && body.id !== statementId) {
    throw new UnequalStatementId(statementId);
  }
  const models = [{
    ...body,
    id: statementId, // Ensures the id is set to the given id.
  }];
  await config.service.storeStatements({ models, attachments, client });
  res.setHeader('X-Experience-API-Version', XAPI_VERSION);
  res.status(204);
  res.send();
};
