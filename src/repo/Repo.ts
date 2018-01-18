import AuthFacade from './authRepo/Facade';
import EventsFacade from './eventsRepo/Facade';
import StorageFacade from './storageRepo/Facade';
import ModelsFacade from './modelsRepo/Facade';

export default interface Repo extends AuthFacade, EventsFacade, ModelsFacade, StorageFacade { }
