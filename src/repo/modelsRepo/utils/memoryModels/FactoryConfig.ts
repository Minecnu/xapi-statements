import FullActivityModel from '../../../../models/FullActivityModel';
import StoredStatementModel from '../../../../models/StoredStatementModel';

export interface State {
  fullActivities?: FullActivityModel[];
  statements?: StoredStatementModel[];
}

export default interface FactoryConfig {
  state?: State;
}
