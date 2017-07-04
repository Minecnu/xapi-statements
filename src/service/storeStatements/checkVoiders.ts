import { includes } from 'lodash';
import UnstoredStatementModel from '../../models/UnstoredStatementModel';
import VoidingError from '../../errors/VoidingError';
import InvalidVoidType from '../../errors/InvalidVoidType';
import voidVerbId from '../../utils/voidVerbId';
import Config from '../Config';

interface VoidResult {
  voiderIds: string[];
  voidedObjectIds: string[];
  voidingModels: UnstoredStatementModel[];
}

const isVoiding = (model: UnstoredStatementModel): boolean => {
  return model.statement.verb.id === voidVerbId;
};

const getVoiders = (statements: UnstoredStatementModel[]): VoidResult => {
  return statements.reduce((result: VoidResult, model) => {
    if (isVoiding(model) && model.statement.object.objectType === 'StatementRef') {
      return {
        voiderIds: [...result.voiderIds, model.statement.id],
        voidedObjectIds: [...result.voidedObjectIds, model.statement.object.id],
        voidingModels: [...result.voidingModels, model],
      };
    }
    return result;
  }, { voiderIds: [], voidedObjectIds: [], voidingModels: [] });
};

const checkWithinStatements = (voiderIds: string[], voidingModels: UnstoredStatementModel[]): void => {
  voidingModels.forEach((model) => {
    if (model.statement.object.objectType !== 'StatementRef') {
      throw new InvalidVoidType(model.statement.object.objectType);
    }
    const targetId = model.statement.object.id;
    if (includes(voiderIds, targetId)) {
      throw new VoidingError([targetId]);
    }
  });
};

const checkWithinRepo = async (
  config: Config,
  voiderIds: string[],
  voidedObjectIds: string[],
): Promise<void> => {
  // Checks that a new voider doesn't reference an existing voider.
  const voidersByObjectIds: string[] = await config.repo.getVoidersByIds({
    ids: voidedObjectIds,
  });
  if (voidersByObjectIds.length > 0) {
    throw new VoidingError(voidersByObjectIds);
  }

  // Checks that a voider doesn't void a new voider.
  const voidersByIds: string[] = await config.repo.getVoidersByObjectIds({
    ids: voiderIds,
  });
  if (voidersByIds.length > 0) {
    throw new VoidingError(voidersByIds);
  }
};

export default async (config: Config, statements: UnstoredStatementModel[]): Promise<string[]> => {
  if (!config.enableVoidingChecks) return [];
  const { voiderIds, voidedObjectIds, voidingModels }: VoidResult = getVoiders(statements);

  if (voiderIds.length > 0) {
    checkWithinStatements(voiderIds, voidingModels);
    await checkWithinRepo(config, voiderIds, voidedObjectIds);
  }

  return voidedObjectIds;
};
