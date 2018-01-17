import { Db } from 'mongodb';

interface Config {
  readonly dbName?: string;
  readonly url?: string;
}

export default Config;
