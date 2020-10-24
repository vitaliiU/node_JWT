const winston = require('winston');

require('winston-daily-rotate-file');

const transport = new winston.transports.DailyRotateFile({
  filename: `${__dirname}/../logs/application-%DATE%.log`,
  datePattern: 'DD-MM-YYYY',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d'
});

// timezone function winston calls to get timezone(ASIA/KOLKATA)

const timezoned = () =>
  new Date().toLocaleString('en-US', {
    timeZone: 'Europe/Minsk'
  });

// options for logger object
const options = {
  file: {
    level: 'info',
    filename: `${__dirname}/../logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 1
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

// logger object with above defined options
const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
    transport
  ],
  format: winston.format.combine(
    winston.format.simple(),
    winston.format.timestamp({
      format: timezoned
    }),
    winston.format.printf(
      info => `[${info.timestamp}] ${info.level}: ${info.message}`
    )
  ),
  exitOnError: false
});

// writing file
logger.stream = {
  write(message) {
    logger.info(message);
  }
};

module.exports = logger;

// _______________________________________YuriiCode__________________________
// const { LOGS_DIR } = require('./config');
// const winston = require('winston');
// const morgan = require('morgan');
// const { combine, timestamp, prettyPrint } = winston.format;

// morgan.token('body', req =>
//   JSON.stringify(req.body).replace(/,("password":").+"/, '$1***"')
// );
// morgan.token('query', req => JSON.stringify(req.query));

// const format = combine(timestamp(), prettyPrint());
// const options = {
//   fileInfo: {
//     format,
//     level: 'info',
//     filename: `${LOGS_DIR}/app.log`,
//     handleExceptions: true,
//     handleRejections: true,
//     json: true,
//     maxsize: 1024 * 5000,
//     maxFiles: 5,
//     colorize: false
//   },
//   fileUnhandled: {
//     format,
//     level: 'error',
//     filename: `${LOGS_DIR}/exceptions.log`,
//     handleExceptions: true,
//     handleRejections: true,
//     json: true,
//     maxsize: 1024 * 5000,
//     maxFiles: 5,
//     colorize: false
//   },
//   fileError: {
//     format,
//     level: 'error',
//     filename: `${LOGS_DIR}/errors.log`,
//     json: true,
//     maxsize: 1024 * 5000,
//     maxFiles: 5,
//     colorize: false
//   }
// };

// const logger = winston.createLogger({
//   transports: [
//     new winston.transports.File(options.fileError),
//     new winston.transports.File(options.fileInfo)
//   ],
//   exceptionHandlers: [new winston.transports.File(options.fileUnhandled)],
//   exitOnError: true
// });

// if (process.env.NODE_ENV === 'development') {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.simple(),
//       handleExceptions: true,
//       handleRejections: true,
//       colorize: false
//     })
//   );
// }

// logger.stream = {
//   write: message => logger.info(message)
// };

// module.exports = logger;
