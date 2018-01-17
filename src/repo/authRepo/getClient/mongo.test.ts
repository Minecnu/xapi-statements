import * as btoa from 'btoa';
import NoModel from 'jscommons/dist/errors/NoModel';
import connectToDb from 'jscommons/dist/mongoRepo/utils/connectToDb';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { ObjectID } from 'mongodb';
import config from '../../../config';
import { MongoClient } from 'mongodb';
import mongoFactory from '../utils/mongoAuth/factory';
import createClientModel from '../../../tests/utils/createClientModel';
import * as assert from 'assert';

const TEST_CLIENT_MODEL = createClientModel({
  _id: '5988f0f00000000000000123',
});
const TEST_BASIC_KEY = '123';
const TEST_BASIC_SECRET = 'abc';
const TEST_TOKEN = `Basic ${btoa(`${TEST_BASIC_KEY}:${TEST_BASIC_SECRET}`)}`;

describe(__filename, () => {
  const db = connectToDb({
    dbName: config.mongo.dbName,
    url: config.mongo.url,
  });
  const authRepo = mongoFactory({
    dbName: config.mongo.dbName,
    url: config.mongo.url,
  });

  it('should return a client from the db', async () => {
    const testDocument = {
      ...TEST_CLIENT_MODEL,
      _id: new ObjectID('5988f0f00000000000000123'),
      api: {
        basic_key: TEST_BASIC_KEY,
        basic_secret: TEST_BASIC_SECRET,
      },
      authority: JSON.stringify(TEST_CLIENT_MODEL),
      organisation: new ObjectID('5988f0f00000000000000000'),
      lrs_id: new ObjectID('5988f0f00000000000000001'),
    };
    await (await db).collection('client').insert(testDocument);
    const result = await authRepo.getClient({ authToken: TEST_TOKEN });
    assert.equal(result.client._id, TEST_CLIENT_MODEL._id);
  });

  it('should error when getting without any clients in the DB', async () => {
    const promise = authRepo.getClient({ authToken: TEST_TOKEN });
    await assertError(NoModel, promise);
  });

  it('should error when getting a client without an LRS', async () => {
    const testDocument = {
      ...TEST_CLIENT_MODEL,
      _id: new ObjectID('5988f0f00000000000000123'),
      api: {
        basic_key: TEST_BASIC_KEY,
        basic_secret: TEST_BASIC_SECRET,
      },
      authority: JSON.stringify(TEST_CLIENT_MODEL),
      organisation: new ObjectID('5988f0f00000000000000000'),
      lrs_id: undefined,
    };
    await (await db).collection('client').insert(testDocument);
    const promise = authRepo.getClient({ authToken: TEST_TOKEN });
    await assertError(NoModel, promise);
  });

  afterEach(async () => {
    await (await db).collection('client').remove({});
  });
});
