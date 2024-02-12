import { MongoGlobal } from '../../validate/db-connection';
import { ConfigService } from '../service.config';

const config = ConfigService.getInstance().getConfig();
const mongoConnection = MongoGlobal.getMongoInstance();

export class UsersDb {
  private static resources: UsersDb;
  private collectionName: string;
  private constructor() {
    this.collectionName = 'User';
  }
  public static getInstance() {
    if (!UsersDb.resources) {
      UsersDb.resources = new UsersDb();
    }
    return UsersDb.resources;
  }

  async doesExist(email: string) {
    // first method for fetching DB
    const dbClient: any = await mongoConnection.getMongoConnection();
    try {
      const database = await dbClient.db(config.mongo.dbName);
      const pipeline = [
        {
          $match: {
            email,
          },
        },
        {
          $limit: 1,
        },
      ];
      const [userInfo] = await database
        .collection(this.collectionName)
        .aggregate(pipeline)
        .toArray();
      return userInfo;
    } catch (error) {
      throw { message: 'Unable to retrieve data' };
    } finally {
      await dbClient.close();
    }

    // Second method for fetching DB
    // return new Promise((resolve, reject) => {
    //   mongoConnection.getMongoConnection().then(async (mongoClient: any) => {
    //     const mongoDb = mongoClient.db("Test2");
    //     mongoDb
    //       .collection(this.collectionName)
    //       .findOne({ email })
    //       .then((resultData: any, error: any) => {
    //         mongoClient.close();
    //         if (error) reject(error);
    //         resolve(resultData);
    //       });
    //   });
    // }).catch((error) => {
    //   console.log("Catch error: ", error);
    //   throw error;
    // });
  }

  async create(data: any) {
    const dbClient: any = await mongoConnection.getMongoConnection();
    try {
      const database = await dbClient.db(config.mongo.dbName);
      const userInfo = await database
        .collection(this.collectionName)
        .insertOne(data);
      return userInfo;
    } catch (error) {
      throw { message: 'Unable to retrieve data' };
    } finally {
      await dbClient.close();
    }
  }

  async resetPassword(email: string, password: string) {
    // query with mongodb api method
    // const dbClient: any = await mongoConnection.getMongoConnection();
    // try {
    //   // Define the update operation
    //   const update = {
    //     $set: {
    //       password,
    //     },
    //   };

    //   const database = await dbClient.db(config.mongo.dbName);
    //   const userInfo = await database
    //     .collection(this.collectionName)
    //     .findOneAndUpdate({ email }, update);
    //   return userInfo;
    // } catch (error) {
    //   throw { message: "Unable to retrieve data" };
    // } finally {
    //   await dbClient.close();
    // }

    // Query with aggregation method
    const dbClient: any = await mongoConnection.getMongoConnection();
    try {
      // Define the update operation
      const pipeline = [
        {
          $match: {
            email,
          },
        },
        {
          $set: {
            password,
          },
        },
        {
          $project: {
            name: 1,
            email: 1,
          },
        },
      ];

      const database = await dbClient.db(config.mongo.dbName);
      const [userInfo] = await database
        .collection(this.collectionName)
        .aggregate(pipeline)
        .toArray();
      return userInfo;
    } catch (error) {
      throw { message: 'Unable to retrieve data' };
    } finally {
      await dbClient.close();
    }
  }
}
