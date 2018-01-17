import FullActivityModel from '../models/FullActivityModel';
import StoredStatementModel from '../models/StoredStatementModel';
import config from '../config';
import facade from './facade';
import Repo from './Repo';

const repo: Repo = facade({
  auth: {
    facade: config.repoFactory.authRepoName,
    fake: {},
    fetch: {
      llClientInfoEndpoint: config.llClientInfoEndpoint,
    },
    mongo: {
      dbName: config.mongo.dbName,
      url: config.mongo.url,
    },
  },
  events: {
    facade: config.repoFactory.eventsRepoName,
    redis: {
      prefix: config.redis.prefix,
      url: config.redis.url,
    },
  },
  models: {
    facade: config.repoFactory.modelsRepoName,
    memory: {
      state: {
        fullActivities: [] as FullActivityModel[],
        statements: [] as StoredStatementModel[],
      },
    },
    mongo: {
      dbName: config.mongo.dbName,
      url: config.mongo.url,
    }
  },
  storage: {
    facade: config.repoFactory.storageRepoName,
    local: {
      storageDir: config.storage.local.storageDir,
    },
    s3: {
      awsConfig: config.storage.s3.awsConfig,
      bucketName: config.storage.s3.bucketName,
      subFolder: config.storage.s3.subFolder,
    },
    google: {
      bucketName: config.storage.google.bucketName,
      keyFileName: config.storage.google.keyFileName,
      projectId: config.storage.google.projectId,
      subFolder: config.storage.google.subFolder,
    }
  },
});

export default repo;
