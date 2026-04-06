const { MongoClient } = require('mongodb');

const uri = "your_mongodb_connection_string";

const client = new MongoClient(uri);

async function connectToDatabase() {
  await client.connect();
  const db = client.db("giftlink");
  return db;
}

module.exports = connectToDatabase;
