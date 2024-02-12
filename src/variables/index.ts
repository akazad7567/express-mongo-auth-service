'use strict'
import * as dotenv from 'dotenv';
dotenv.config();
const Port = process.env.PORT;

export const variables = {
    Port,
}