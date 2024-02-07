import { MongoGlobal } from "../../config/db.global.config";
import { variables } from "../../variables";
import { ObjectID } from "mongodb";

const dbConnection = MongoGlobal.getMongoInstance();
export class PostsDb {
  private static resources: PostsDb;
  private collectionName: string;
  private constructor() {
    this.collectionName = "Post";
  }

  public static getInstance() {
    if (!this.resources) {
      this.resources = new PostsDb();
    }
    return this.resources;
  }
  async create(data: any) {
    const dbClient: any = await dbConnection.getMongoConnection();
    try {
      const database = await dbClient.db(variables.DatabaseName);
      const postData = await database
        .collection(this.collectionName)
        .insertOne(data);
      return postData;
    } catch (error) {
      throw { message: "Unable to retrieve data" };
    } finally {
      await dbClient.close();
    }
  }

  async getAll() {
    const dbClient: any = await dbConnection.getMongoConnection();
    try {
      const pipeline = [
        {
          $match: {},
        },
        {
          $project: {
            _id: 1,
            title: 1,
            author: 1,
            description: 1,
            published: 1,
          },
        },
      ];
      const database = await dbClient.db(variables.DatabaseName);
      const getAllPost = await database
        .collection(this.collectionName)
        .aggregate(pipeline)
        .toArray();
      return getAllPost;
    } catch (error) {
      throw { message: "Unable to retrieve data" };
    } finally {
      dbClient.close();
    }
  }

  async get(id: number): Promise<any> {
    const dbClient: any = await dbConnection.getMongoConnection();
    try {
      const pipeline = [
        {
          $match: {
            _id: new ObjectID(id),
          },
        },
        {
          $project: {
            _id: 1,
            author: 1,
            description: 1,
          },
        },
      ];
      const database = await dbClient.db(variables.DatabaseName);
      const [postData] = await database
        .collection(this.collectionName)
        .aggregate(pipeline)
        .toArray();
      return postData;
    } catch (error) {
      throw { message: "Unable to retrieve data" };
    } finally {
      dbClient.close();
    }
  }

  async update(id: number, data: any): Promise<any> {
    const dbClient: any = await dbConnection.getMongoConnection();
    try {
      const database = await dbClient.db(variables.DatabaseName);
      const postData = await database
        .collection(this.collectionName)
        .updateOne({ _id: new ObjectID(id) }, { $set: data });
      return postData;
    } catch (error) {
      throw { message: "Unable to retrieve data" };
    } finally {
      dbClient.close();
    }
  }

  async delete(id: string): Promise<any> {
    const dbClient: any = await dbConnection.getMongoConnection();
    try {
      const database = await dbClient.db(variables.DatabaseName);
      const postData = await database
        .collection(this.collectionName)
        .deleteOne({ _id: new ObjectID(id) });
      return postData;
    } catch (error) {
      throw { message: "Unable to retrieve data" };
    } finally {
      dbClient.close();
    }
    // const user = await Post.findByIdAndDelete(id);
    // if (!user) {
    //   throw { message: "User not available" };
    // }
    // return user;
  }
}
