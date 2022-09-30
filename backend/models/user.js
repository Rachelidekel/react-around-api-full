const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { urlRegex } = require('../utils/regex');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Jacques Cousteau',
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      default: 'Explorer',
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
      required: true,
      validate: {
        validator: (value) => value.match(urlRegex),
        message: 'invalid url',
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: 'A valid email adress is required',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false }
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Incorrect email or password'));
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
