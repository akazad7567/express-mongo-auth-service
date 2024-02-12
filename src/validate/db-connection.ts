import { MongoClient } from 'mongodb';
import { ConfigService } from '../services/service.config';

const config = ConfigService.getInstance().getConfig();

export class MongoGlobal {
  private static mongo: MongoGlobal;
  private mongoClient: any;
  private constructor() {
    this.mongoClient = MongoClient;
  }

  public static getMongoInstance() {
    if (!MongoGlobal.mongo) {
      MongoGlobal.mongo = new MongoGlobal();
    }
    return MongoGlobal.mongo;
  }

  public async getMongoConnection() {
    return new Promise((resolve, reject) => {
      this.mongoClient
        .connect(config.mongo.url)
        .then(async (client: any) => {
          resolve(client);
        })
        .catch((error: any) => {
          reject(error);
        });
    }).catch((e) => {
      console.log('getMongoConnection catch error: ', e);
    });
  }
}
