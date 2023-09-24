const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Неправильный email',
      },
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
  },

  { versionKey: false },
);

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .orFail(new UnauthorizedError('Email и/или пароль введены с ошибкой'))
    .then((user) => bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(
          new UnauthorizedError('Email и/или пароль введены с ошибкой'),
        );
      }
      return user;
    }));
};

module.exports = mongoose.model('user', userSchema);
