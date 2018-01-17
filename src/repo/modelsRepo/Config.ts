import MemoryConfig from './utils/memoryModels/Config';
import MongoConfig from './utils/mongoModels/Config';

export default interface Config {
  readonly facade: string;
  readonly memory: MemoryConfig;
  readonly mongo: {
    readonly dbName: string;
    readonly url: string;
  };
}
