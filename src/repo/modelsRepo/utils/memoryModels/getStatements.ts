import Statement from '../../../../models/Statement';
import ClientModel from '../../../../models/ClientModel';
import matchesClientOption from './matchesClientOption';
import FacadeConfig from './FacadeConfig';

export interface Options<Result> {
  config: FacadeConfig;
  query: (model: Statement) => boolean;
  project: (model: Statement) => Result;
  client: ClientModel;
}

export default async <Result>({ config, query, project, client }: Options<Result>): Promise<Result[]> => {
  const results = config.state.statements.filter((model) => {
    return (
      query(model.statement) &&
      matchesClientOption(model, client)
    );
  }).map((model) => {
    return project(model.statement);
  });
  return results;
};
