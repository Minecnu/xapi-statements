import Statement from '../../models/Statement';
import GetStatementsOptions from '../../repo/GetStatementsOptions';
import isMatchingRelatedActivity from './isMatchingRelatedActivity';
import isMatchingActivity from './isMatchingActivity';

export default (statement: Statement, opts: GetStatementsOptions): boolean => {
  return (
    opts.activity === undefined ? true :
    (
      opts.relatedActivities === true ?
      isMatchingRelatedActivity(statement, opts.activity) :
      (
        statement.object.objectType === 'Activity' &&
        isMatchingActivity(statement.object, opts.activity)
      )
    )
  );
};
