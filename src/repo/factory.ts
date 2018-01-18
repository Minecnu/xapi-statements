import authFactory from './authRepo/factory';
import eventsFactory from './eventsRepo/factory';
import modelsFactory from './modelsRepo/factory';
import storageFactory from './storageRepo/factory';
import Repo from './Repo';
import FactoryConfig from './FactoryConfig';

export default (config: FactoryConfig): Repo => {
  const authRepo = authFactory(config.auth);
  const eventsRepo = eventsFactory(config.events);
  const modelsRepo = modelsFactory(config.models);
  const storageRepo = storageFactory(config.storage);

  return {
    ...eventsRepo,
    ...authRepo,
    ...modelsRepo,
    ...storageRepo,

    clearRepo: async () => {
      await Promise.all([
        eventsRepo.clearRepo(),
        modelsRepo.clearRepo(),
        storageRepo.clearRepo(),
      ]);
    },
    migrate: async () => {
      await Promise.all([
        eventsRepo.migrate(),
        modelsRepo.migrate(),
        storageRepo.migrate(),
      ]);
    },
    rollback: async () => {
      await Promise.all([
        eventsRepo.rollback(),
        modelsRepo.rollback(),
        storageRepo.rollback(),
      ]);
    },
  };
};
