const mongoose = require('mongoose');
const uuid = require('uuid');

const userSchema = new mongoose.Schema(
  {
    name: String,
    login: String,
    password: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

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

// class User {
//   constructor({
//     id = uuid(),
//     name = 'USER',
//     login = 'user',
//     password = 'P@55w0rd'
//   } = {}) {
//     this.id = id;
//     this.name = name;
//     this.login = login;
//     this.password = password;
//   }

//   static toResponse(user) {
//     const { id, name, login } = user;
//     return { id, name, login };
//   }

//   static fromRequest(body) {
//     return new User(body);
//   }
// }

module.exports = User;
