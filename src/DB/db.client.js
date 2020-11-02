// getting-started.js
const mongoose = require('mongoose');
const config = require('../common/config');
const bcrypt = require('bcrypt');

const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

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
    // ______________________________________DefaultUserTest____________________________
    // User.createIndex({ login: 1 }, { unique: true });
    // User.createIndexes([{ login: { unique: true } }]);
    User.insertMany([
      {
        name: 'admin',
        login: 'admin',
        // eslint-disable-next-line no-sync
        password: bcrypt.hashSync('admin', 10)
      },
      {
        name: 'userTest1',
        login: 'login1',
        // eslint-disable-next-line no-sync
        password: bcrypt.hashSync('login555', 10)
      }
    ]);
    // ______________________________________DefaultBoardTest____________________________
    Board.insertMany([
      {
        title: 'boardTest1',
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
        title: 'boardTest2',
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
    // ______________________________________DefaultTaskTest_______________________________
    Task.insertMany([
      {
        title: 'taskTest1',
        order: 1,
        description: 'description1',
        userId: 'c1ab81cc-ae7f-48f6-b025-b24019fd7fbf',
        boardId: 'bfe972f4-cae8-4012-b4e8-b82daeb4fb2d',
        columnId: 'v1ab81cc-ae7f-48f6-b025-b24019fd7frr'
      },
      {
        title: 'taskTest2',
        order: 2,
        description: 'description2',
        userId: 'h1ab81cc-ae7f-48f6-b025-b24019fd7fbl',
        boardId: 'yfe972f4-cae8-4012-b4e8-b82daeb4fb2u',
        columnId: 'i1ab81cc-ae7f-48f6-b025-b24019fd7frs'
      }
    ]);
    cb();
  });
};
module.exports = { connectToDB };
