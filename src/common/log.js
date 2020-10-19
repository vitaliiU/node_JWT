const winston = require('../../config/winston');
const {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  getStatusText
} = require('http-status-codes');

module.exports.logging = req => {
  const { query, method, body } = req;
  const urlLoc = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  winston.info(`
      method= ${method},
      url= ${urlLoc},
      query parameters =${JSON.stringify(query)},
      body= ${JSON.stringify(body)}
     `);
};

module.exports.errHand = err => {
  if (err.status === 404) {
    winston.error(`Client Error. StatusCode ${err.status}. ${err.message}`);
  } else if(err.status === 404){
    winston.error(`Server Error. StatusCode ${err.status}. ${err.message}`);
  }
};
