import NoModel from 'jscommons/dist/errors/NoModel';
import ChangedStatementRef from '../../../errors/ChangedStatementRef';
import matchesClientOption from '../utils/memoryModels/matchesClientOption';
import Config from '../utils/memoryModels/Config';
import Signature, { Opts } from './Signature';

export default (config: Config): Signature => {
  return async ({ client, id }) => {
    const filteredModels = config.state.statements.filter((model) => {
      return (
        model.statement.object.objectType === 'StatementRef' &&
        model.statement.id === id &&
        matchesClientOption(model, client)
      );
    });
    if (filteredModels.length === 0) {
      throw new NoModel('Statement');
    }
    const statementObject = filteredModels[0].statement.object;
    if (statementObject.objectType === 'StatementRef') {
      return statementObject.id;
    }

    /* istanbul ignore next */
    throw new ChangedStatementRef(id);
  };
};
