import matchesModel, { ModelMatcher } from './matchesModel';

const matcher = (verb: string): Object => {
  return {
    verbs: verb,
  };
};

export default matchesModel(matcher, (opts) => {
  return opts.verb;
}) as ModelMatcher;
