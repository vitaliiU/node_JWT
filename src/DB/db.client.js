// getting-started.js
const mongoose = require('mongoose');
// const MONGO_CONNECTION_STRING = require('dotenv');

const User = require('../resources/users/user.model');

const connectToDB = cb => {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  //   mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log("we're connected!");
    // db.dropDatabase();
    // User.insertMany([
    //   { name: 'user1', login: 'admin', password: 'admin' },
    //   { name: 'user2', login: 'login2', password: 'login2222' }
    // ]);
    cb();
  });
};
module.exports = { connectToDB };