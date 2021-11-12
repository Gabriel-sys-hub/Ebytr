const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_DB_URL = process.env.HOST;

const DB_NAME = 'Ebytr';

const connection = () => MongoClient
  .connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => conn.db(DB_NAME))
  .catch((err) => {
    console.error(err);
    process.exit();
  });

module.exports = connection; 