import Forbidden from '../../errors/Forbidden';
import NoModel from '../../errors/NoModel';
import * as scopes from '../../utils/scopes';
import setup from '../utils/setup';
import createStatement from '../utils/createStatement';
import createClientModel from '../utils/createClientModel';
import storeStatementsInService from '../utils/storeStatementsInService';
import assertError from '../utils/assertError';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_STATEMENT = createStatement({ id: TEST_ID });
const TEST_FORBIDDEN_SCOPES = [
  scopes.XAPI_STATEMENTS_WRITE,
  scopes.XAPI_PROFILE_ALL,
  scopes.XAPI_STATE_ALL,
];

describe('get statement with scopes', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const testReadAllScope = async (scopes: string[]) => {
    const client = createClientModel({ _id: 'test_client_b', scopes });
    await storeStatements([TEST_STATEMENT]);
    await service.getStatement({ id: TEST_ID, voided: false, client });
  };

  it('should throw an error when using a different client with read mine scope', async () => {
    const client = createClientModel({
      _id: 'test_client_b',
      scopes: [scopes.XAPI_STATEMENTS_READ_MINE],
    });
    await storeStatements([TEST_STATEMENT]);
    await assertError(NoModel)(
      service.getStatement({ id: TEST_ID, voided: false, client })
    );
  });

  it('should return a statement when using a different client with xAPI all scope', async () => {
    await testReadAllScope([scopes.XAPI_ALL]);
  });

  it('should return a statement when using a different client with xAPI read scope', async () => {
    await testReadAllScope([scopes.XAPI_READ]);
  });

  it('should return a statement when using a different client with xAPI read statements scope', async () => {
    await testReadAllScope([scopes.XAPI_STATEMENTS_READ]);
  });

  it('should return a statement when using a different client with read all scope', async () => {
    await testReadAllScope([scopes.ALL_READ]);
  });

  it('should throw an error when using a forbidden read scope', async () => {
    const client = createClientModel({
      _id: 'test_client_b',
      scopes: TEST_FORBIDDEN_SCOPES,
    });
    await storeStatements([TEST_STATEMENT]);
    const promise = service.getStatement({ id: TEST_ID, voided: false, client });
    await assertError(Forbidden)(promise);
  });
});