import Signature, { Opts } from './Signature';
import FacadeConfig from '../utils/redisEvents/FacadeConfig';

const EVENT_NAME = 'statement.new';
const CHANNEL_NAME = 'statement.notify';

export default (config: FacadeConfig): Signature => {
  const rpush = (key: string, ...args: string[]) => {
    return new Promise((resolve) => {
      config.client.rpush(key, ...args, () => {
        resolve();
      });
    });
  };

  return async ({ ids }) => {
    const listName = `${config.prefix}:${EVENT_NAME}`;
    const channelName = `${config.prefix}:${CHANNEL_NAME}`;
    await rpush(listName, ...ids);
    config.client.publish(channelName, '');
  };
};
