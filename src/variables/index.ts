'use strict'
import * as dotenv from 'dotenv';
dotenv.config();
const DatabaseName = process.env.DatabaseName;
const Port = process.env.PORT;
const DbConnectionUrl = process.env.DbConnectionUrl;



export const variables = {
    DatabaseName,
    Port,
    DbConnectionUrl
}