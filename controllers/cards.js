const {
  HTTP_STATUS_OK,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = require('http2').constants;
const mongoose = require('mongoose');
const Card = require('../models/card');
const { NotFoundError } = require('../utils/not-found-error');

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(HTTP_STATUS_OK).send(cards);
  } catch (error) {
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на стороне сервера', error: error.message });
  }
};

module.exports.createCard = async (req, res) => {
  try {
    const owner = req.user._id;
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner });
    return res.send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Ошибка валидации полей', ...error });
    }
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на стороне сервера', error: error.message });
  }
};

module.exports.deleteCardById = async (req, res) => {
  try {
    const cardDelete = await Card.findByIdAndDelete(req.params.id);
    if (!cardDelete) {
      return res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка не найдена' });
    }
    return res.send({ message: 'Карточка успешно удалена' });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Передан невалидный ID' });
    } if (error instanceof NotFoundError) {
      return res.status(error.statusCode).send({ message: error.message });
    }
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на стороне сервера', error: error.message });
  }
};

module.exports.likeCard = async (req, res) => {
  try {
    const cardLike = await Card.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!cardLike) {
      return res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка не найдена' });
    }
    return res.send({ message: 'Лайк успешно добавлен' });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Передан невалидный ID' });
    } if (error instanceof NotFoundError) {
      return res.status(error.statusCode).send({ message: error.message });
    }
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на стороне сервера', error: error.message });
  }
};

module.exports.dislikeCard = async (req, res) => {
  try {
    const cardDislike = await Card.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!cardDislike) {
      return res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка не найдена' });
    }
    return res.send({ message: 'Лайк успешно удалён' });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Передан невалидный ID' });
    } if (error instanceof NotFoundError) {
      return res.status(error.statusCode).send({ message: error.message });
    }
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на стороне сервера', error: error.message });
  }
};
