const config = require('../config/config');
const { MongoClient } = require('mongodb');

let dbClient;


async function connectDB() {
    if(!dbClient){
        const client = new MongoClient(config.mongoURI);
        await client.connect();
        dbClient = client;
        console.log('Connected Database');
    }
    return dbClient;
}


function getDB(){
    if(!dbClient){
        throw new Error('Database Not Connected, First Connect to Database');
    }
    
    return dbClient.db(config.databaseName);
}

module.exports = { connectDB, getDB }