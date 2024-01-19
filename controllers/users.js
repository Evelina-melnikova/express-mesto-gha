// eslint-disable-next-line import/no-extraneous-dependencies, import/order, import/no-unresolved
const bcrypt = require('bcrypt');

const User = require('../models/user');
// const ErrorsProject = require('../utils/errorsProject');
const HttpCodes = require('../utils/constants');

// eslint-disable-next-line consistent-return
async function getUsers(req, res, next) {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (e) {
    next(e);
  }
}

// eslint-disable-next-line consistent-return
const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).orFail(
      // eslint-disable-next-line no-undef
      () => new NotFoundError('Пользователь по заданному ID не найден'),
    );
    return res.status(HttpCodes.success).send(user);
  } catch (e) {
    if (e.name === 'NotFoundError') {
      // eslint-disable-next-line no-undef
      next(new NotFoundError('Пользователь по заданному ID не найден'));
      // eslint-disable-next-line consistent-return
      return;
    }
    if (e.name === 'CastError') {
      // eslint-disable-next-line no-undef
      next(new NotValidIdError('Передан не валидный ID'));
      // eslint-disable-next-line consistent-return
      return;
    }
    next(e);
  }
};
// eslint-disable-next-line consistent-return
const createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const soltRounds = 10;
    const hash = await bcrypt.hash(password, soltRounds);
    const newUser = await User.create({ email, password: hash });
    return res.status(HttpCodes.create).send({
      // eslint-disable-next-line max-len
      name: newUser.name, about: newUser.about, avatar: newUser.avatar, email: newUser.email, id: newUser._id,
    });
  } catch (e) {
    if (e.code === HttpCodes.dublicate) {
      // eslint-disable-next-line no-undef
      next(new ConflictError('Такой пользователь уже существует'));
      // eslint-disable-next-line consistent-return
      return;
    }
    next(e);
  }
};
// eslint-disable-next-line consistent-return
const updateUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const updateUserProfile = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    return res.status(HttpCodes.success).send(updateUserProfile);
  } catch (e) {
    if (e.name === 'ValidationError') {
      // eslint-disable-next-line no-undef
      next(new NotValidIdError('Переданы не валидные данные'));
      // eslint-disable-next-line consistent-return
      return;
    }
    if (e.name === 'NotFoundError') {
      // eslint-disable-next-line no-undef
      next(new NotFoundError('Пользователь по заданному ID не найден'));
      // eslint-disable-next-line consistent-return
      return;
    }
    // eslint-disable-next-line no-undef
    next(e);
  }
};

// eslint-disable-next-line consistent-return
const updateUserAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const updateUserAvatr = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    return res.status(HttpCodes.create).send(updateUserAvatr);
  } catch (e) {
    if (e.name === 'ValidationError') {
      // eslint-disable-next-line no-undef
      next(new NotValidIdError('Переданы не валидные данные'));
      // eslint-disable-next-line consistent-return
      return;
    }
    if (e.name === 'NotFoundError') {
      // eslint-disable-next-line no-undef
      next(new NotFoundError('Пользователь по заданному ID не найден'));
      // eslint-disable-next-line consistent-return
      return;
    }
    // eslint-disable-next-line no-undef
    next(e);
  }
};
// eslint-disable-next-line consistent-return
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userAdmin = await User.findOne({ email }).select('+password').orFail(
      () => new Error('NotAuthantificate'),
    );
    const matched = await bcrypt.compare(password, userAdmin.password);
    if (!matched) {
      throw new Error('NotAuthantificate');
    }

    // eslint-disable-next-line no-undef
    const token = generateToken({ _id: userAdmin._id });
    return res.status(HttpCodes.success).send(
      {
        // eslint-disable-next-line max-len
        name: userAdmin.name, about: userAdmin.about, avatar: userAdmin.avatar, email: userAdmin.email, id: userAdmin._id, token,
      },
    );
  } catch (e) {
    if (e.message === 'NotAuthantificate') {
      // eslint-disable-next-line no-undef
      next(new NotAuthorizate('Неверно введены данные'));
      // eslint-disable-next-line consistent-return
      return;
    }
    next(e);
  }
};

// eslint-disable-next-line consistent-return
const UsersMe = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      // eslint-disable-next-line no-undef
      throw new NotValidIdError('User not found');
    }
    return res.status(HttpCodes.success).send(user);
  } catch (e) {
    if (e.message === 'User not found') {
      // eslint-disable-next-line no-undef
      next(new NotValidIdError('Переданы не валидные данные'));
      // eslint-disable-next-line consistent-return
      return;
    }
    next(e);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
  UsersMe,
};
