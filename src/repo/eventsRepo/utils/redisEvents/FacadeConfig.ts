import * as redis from 'redis';

export default interface FacadeConfig {
  readonly client: redis.RedisClient;
  readonly prefix: string;
}
