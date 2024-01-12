const {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = require('http2').constants;
const User = require('../models/user');
const ErrorsProject = require('../utils/errorsProject');
const HttpCodes = require('../utils/constants');

async function getUsers(req, res) {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (e) {
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на стороне сервера', error: e.message });
  }
}

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).orFail(
      () => new ErrorsProject('Пользователь по заданному ID не найден'),
    );
    return res.status(HttpCodes.success).send(user);
  } catch (e) {
    switch (e.name) {
      case 'CastError':
        return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Передан невалидный ID' });
      case 'ErrorsProject':
        return res.status(e.statusCode).send({ message: e.message });

      default:
        return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на стороне сервера', error: e.message });
    }
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    return res.status(HttpCodes.create).send(newUser);
  } catch (e) {
    switch (e.name) {
      case 'ValidationError':
        return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Ошибка валидации полей', ...e });

      default:
        return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на стороне сервера', error: e.message });
    }
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, about } = req.body;
    const upUserProfile = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    return res.status(HttpCodes.create).send(upUserProfile);
  } catch (e) {
    switch (e.name) {
      case 'ValidationError':
        return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Ошибка валидации полей', ...e });
      case 'ErrorsProject':
        return res.status(e.statusCode).send(e.message);

      default:
        return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на стороне сервера', error: e.message });
    }
  }
};

const updateUserAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const upUserAvatr = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    return res.status(HttpCodes.create).send(upUserAvatr);
  } catch (e) {
    switch (e.name) {
      case 'ValidationError':
        return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Ошибка валидации полей', ...e });
      case 'ErrorsProject':
        return res.status(e.statusCode).send(e.message);

      default:
        return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на стороне сервера', error: e.message });
    }
  }
};
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
