const winston = require('../../config/winston');

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

module.exports.errHand = async (err, res) => {
  if (err.message === '470') {
    winston.error(
      'Client Error. Status Code 470. Error was generated on client side via URL.'
    );
  } else if (err.status === 404) {
    res.status(404).send(err.message);
    winston.error(`Client Error. StatusCode ${err.status}. ${err.message}`);
  } else {
    res.status(500).send(err.message);
    winston.error('Internal Server Error. StatusCode 500.');
  }
};
