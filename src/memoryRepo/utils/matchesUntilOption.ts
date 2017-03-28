import Statement from '../../models/Statement';
import GetStatementsOptions from '../../repo/GetStatementsOptions';

export default (statement: Statement, opts: GetStatementsOptions): boolean => {
  return (
    opts.until === undefined ? true :
    statement.stored <= opts.until.toISOString()
  );
};
