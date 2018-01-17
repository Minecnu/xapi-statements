import AuthFactoryConfig from './authRepo/FactoryConfig';
import EventsFactoryConfig from './eventsRepo/Config';
import ModelsFactoryConfig from './modelsRepo/Config';
import StorageFactoryConfig from './storageRepo/FactoryConfig';

export default interface Config {
  readonly auth: AuthFactoryConfig;
  readonly events: EventsFactoryConfig;
  readonly models: ModelsFactoryConfig;
  readonly storage: StorageFactoryConfig;
}
