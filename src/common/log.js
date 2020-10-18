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

module.exports.errHand = (err, res) => {
  console.log(888888888888888);
  winston.error('Internal Server Error');
  // console.error(err.stack);
  console.error(err.message);

  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
  // res.status(500).send('500. Internal Server Error');
};
