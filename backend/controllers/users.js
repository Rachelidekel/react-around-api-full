const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const ConflictError = require('../errors/conflict-error');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(
          'The user with the provided email already exists'
        );
      } else {
        return bcrypt.hash(password, 10);
      }
    })
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.status(201).send({ _id: user._id, email: user.email }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${err.name}: ${err.message}`));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  console.log(req.body)
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret',
        {
          expiresIn: '7d',
        }
      );
      res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError('Incorrect email or password'));
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const { user } = req;
  User.findById(user)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('No user found with this Id');
      } else {
        return res.status(200).send({ user });
      }
    })
    .catch(next);
};

const getUserId = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => {
      throw new NotFoundError('No user found with this Id');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`${`${err.name}: ${err.message}`}`));
      } else {
        next(err);
      }
    });
};

const updateUserInfo = (req, res, next) => {
  const { _id } = req.user;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    _id,
    { $set: { name, about } },
    { runValidators: true, new: true }
  )
    .orFail(() => {
      throw new NotFoundError('No user found with this Id');
    })
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'CastError' || 'ValidationError') {
        next(new BadRequestError(`${`${err.name}: ${err.message}`}`));
      } else {
        next(err);
      }
    });
};

const updateUserAvatar = (req, res) => {
  const { _id } = req.user;
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    _id,
    { $set: { avatar } },
    { runValidators: true, new: true }
  )
    .orFail(() => {
      throw new NotFoundError('No user found with this Id');
    })
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'CastError' || 'ValidationError') {
        next(new BadRequestError(`${`${err.name}: ${err.message}`}`));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  login,
  getUsers,
  getCurrentUser,
  getUserId,
  updateUserInfo,
  updateUserAvatar,
};
