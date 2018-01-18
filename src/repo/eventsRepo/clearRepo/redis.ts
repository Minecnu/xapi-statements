import FacadeConfig from '../utils/redisEvents/FacadeConfig';

const EVENT_NAME = 'statement.new';

export default (config: FacadeConfig) => {
  const del = (key: string) => {
    return new Promise((resolve) => {
      config.client.del(key, () => {
        resolve();
      });
    });
  };

  return async (): Promise<void> => {
    const listName = `${config.prefix}:${EVENT_NAME}`;
    await del(listName);
  };
};
