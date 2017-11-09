import mongoose from 'mongoose';
import Constants from './constants';

// Use native promises
mongoose.Promise = global.Promise;

// Connect to our mongo database;
console.log('DB running at: ', Constants.mongo.uri)
mongoose.connect(Constants.mongo.uri, {
  useMongoClient: true,
  /* other options */
});
mongoose.connection.on('error', (err) => {
  throw err;
});
