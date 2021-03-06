const mongoose = require('mongoose');
const uuid = require('uuid');

const userSchema = new mongoose.Schema(
  {
    name: String,
    login: String,
    // login: { type: String, index: true, unique: true },
    password: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);
// userSchema.createIndexes([{ login: { unique: true } }]);

userSchema.statics.toResponse = user => {
  if (!user.result) {
    const { id, name, login } = user;
    return { id, name, login };
  }
  return user;
};

userSchema.statics.fromRequest = body => {
  return new User(body);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
