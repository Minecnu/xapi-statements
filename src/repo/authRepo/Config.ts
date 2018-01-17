import FakeConfig from './utils/fakeAuth/Config';
import FetchConfig from './utils/fetchAuth/Config';

export default interface Config {
  readonly facade: string;
  readonly fake: FakeConfig;
  readonly fetch: FetchConfig;
  readonly mongo: {
    readonly dbName: string;
    readonly url: string;
  };
}
