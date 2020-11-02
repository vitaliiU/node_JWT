const createError = require('http-errors');
// const bcrypt = require('bcrypt');

const User = require('../users/user.model');

const get = async body => {
  try {
    // const responseLoc = { user: null, passwordCheck: null };
    // responseLoc.user = (await User.find({ login: body.login }))[0];
    // const match = await bcrypt.compare(
    //   body.password,
    //   responseLoc.user.password
    // );
    // if (match) {
    //   responseLoc.passwordCheck = true;
    // }
    return (await User.find({ login: body.login }))[0];
  } catch (e) {
    throw createError(500, 'Error find user in DB on loggin');
  }
};

module.exports = { get };
