const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const createError = require('http-errors');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const log = require('./common/log');

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

// localhost:4000/users/?age=22&name=jim
app.use((req, res, next) => {
  log.logging(req);
  next();
});

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  // throw new Error();
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.get('/error', () => {
  throw new Error();
});

process.on('uncaughtException', error => {
  createError(555, error.message);
  // process.exit(1);
});

process.on('unhandledRejection', reason => {
  console.error(`Unhandled rejection detected: ${reason.message}`);
});

// Your Default Error Handler
app.use((err, req, res, next) => {
  log.errHand(err);
  next();
});

// throw Error('GopStop!!!!!');
// Promise.reject(Error('GopStop!!!!!'));

//--
module.exports = app;
