import StatementModel from '../models/StatementModel';
import GetStatementOptions from '../repo/GetStatementOptions';
import NoModel from '../errors/NoModel';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetStatementOptions): Promise<StatementModel> => {
    const filteredModels = config.state.statements.filter((model) => {
      return (
        model.statement.id === opts.id &&
        model.voided === false
      );
    });
    if (filteredModels.length === 0) {
      throw new NoModel('Statement');
    }
    return filteredModels[0];
  };
};
