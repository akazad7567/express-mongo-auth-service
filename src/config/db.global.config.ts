import { MongoClient } from "mongodb";
import { variables } from '../variables';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
  };

export class MongoGlobal{
    private static mongo : MongoGlobal;
    private mongoClient;
    private constructor(){
        this.mongoClient = MongoClient;
    }

    public static getMongoInstance(){
        if( !MongoGlobal.mongo ){
            MongoGlobal.mongo = new MongoGlobal();
        }
        return MongoGlobal.mongo;
    };


    public async getMongoConnection(){
        return new Promise((resolve, reject)=>{
            this.mongoClient.connect(variables.DbConnectionUrl, options).then(async(client)=>{
                resolve(client);
            }).catch((error)=>{
                reject (error);
            });
        }).catch((e) => {
            console.log('getMongoConnection catch error: ', e);
        });;
    }


}