const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const winston = require('../config/winston');

const loginRouter = require('./resources/logins/login.router');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const checkToken = require('../src/utils/auth/checkToken');
const log = require('./common/log');

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

// localhost:4000/users/?age=22&name=jim
app.use((req, res, next) => {
  log.logging(req);
  next();
});

app.use(checkToken, (req, res, next) => {
  next();
});

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
// possible add midlewaer several in the path!!!!!!!!!!!!
// app.use('/users', checkToken, usersRouter);

app.use('/', (req, res, next) => {
  // throw new Error();
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.get('/error', () => {
  throw new Error(470);
});

process.on('uncaughtException', error => {
  throw new Error(`Uncaught Exception. Captured error: ${error.message}`);
  // process.exit(1);
});

process.on('unhandledRejection', reason => {
  winston.error(`Unhandled rejection detected: ${reason.message}`);
});

// Default Error Handler
app.use((err, req, res, next) => {
  log.errHand(err, res);
  next();
});

// throw Error('GopStop!!!!!');
// Promise.reject(new Error('GopStop!!!!!'));

//--
module.exports = app;
