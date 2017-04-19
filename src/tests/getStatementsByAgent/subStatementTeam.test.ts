import createSubStatement from '../utils/createSubStatement';
import groupTest from './utils/groupTest';

describe('get statements by agent in sub statement team', () => {
  groupTest((team: any) => {
    return createSubStatement({ context: { team } });
  }, true);
});
