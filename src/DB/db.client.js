// getting-started.js
const mongoose = require('mongoose');
const config = require('../common/config');

const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');

const connectToDB = cb => {
  mongoose.connect(config.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log("we're connected!");
    db.dropDatabase();
    // ______________________________________DefaultUser____________________________
    User.insertMany([
      { name: 'user1', login: 'admin', password: 'admin' },
      { name: 'user2', login: 'login2', password: 'login2222' }
    ]);
    // ______________________________________DefaultBoard____________________________
    Board.insertMany([
      {
        title: 'board1',
        columns: [
          {
            title: 'column1',
            order: 1
          },
          {
            title: 'column2',
            order: 2
          }
        ]
      },
      {
        title: 'board2',
        columns: [
          {
            title: 'column3',
            order: 3
          },
          {
            title: 'column4',
            order: 4
          }
        ]
      }
    ]);
    cb();
  });
};
module.exports = { connectToDB };
