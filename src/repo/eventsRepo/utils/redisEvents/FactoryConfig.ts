import * as redis from 'redis';

export default interface FactoryConfig {
  readonly url?: string;
  readonly prefix?: string;
}
