const createError = require('http-errors');
const bcrypt = require('bcrypt');

const User = require('../users/user.model');

const get = async body => {
  try {
    const responseLoc = { user: null, passwordCheck: null };
    responseLoc.user = (await User.find({ login: body.login }))[0];
    console.log(body.password);
    console.log(responseLoc.user.password);
    const match = await bcrypt.compare(
      body.password,
      responseLoc.user.password
    );
    if (match) {
      responseLoc.passwordCheck = true;
    }
    console.log(responseLoc);
    return responseLoc;
  } catch (e) {
    throw createError(403, 'Wrong login');
  }
};

module.exports = { get };
