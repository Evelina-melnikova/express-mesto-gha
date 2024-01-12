// eslint-disable-next-line import/extensions
const Card = require('../models/card');

// eslint-disable-next-line import/extensions
const ErrorsProject = require('../utils/errorsProject');

// eslint-disable-next-line import/extensions
const HttpCodes = require('../utils/constants');

async function getCards(req, res) {
  try {
    const cards = await Card.find({});
    return res.send(cards);
  } catch (e) {
    return res.status(HttpCodes.serverErr).send({ message: 'Ошибка на стороне сервера', error: e.message });
  }
}
const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId).orFail(
      () => new ErrorsProject('Карточка по заданному ID не найдена'),
    );
    return res.status(HttpCodes.success).send(card);
  } catch (e) {
    switch (e.name) {
      case 'CastError':
        return res.status(HttpCodes.notFoundId).send({ message: 'Передан не валидный ID' });
      case 'ErrorsProject':
        return res.status(e.statusCode).send(e.message);

      default:
        return res
          .status(HttpCodes.serverErr)
          .send({ message: 'Ошибка на стороне сервера', error: e.message });
    }
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    const newCard = await Card.create({ name, link, owner });
    return res.status(HttpCodes.create).send(newCard);
  } catch (e) {
    switch (e.name) {
      case 'ValidationError':
        return res.status(HttpCodes.notFoundId).send({ message: 'Переданы не валидные данные' });

      default:
        return res
          .status(HttpCodes.serverErr)
          .send({ message: 'Ошибка на стороне сервера', error: e.message });
    }
  }
};

const likeCard = async (req, res) => {
  try {
    const like = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail(
      () => new ErrorsProject('Карточка по заданному ID не найдена'),
    );
    return res.status(HttpCodes.create).send(like);
  } catch (e) {
    switch (e.name) {
      case 'CastError':
        return res.status(HttpCodes.notFoundId).send({ message: 'Передан не валидный ID' });
      case 'ErrorsProject':
        return res.status(e.statusCode).send(e.message);

      default:
        return res
          .status(HttpCodes.serverErr)
          .send({ message: 'Ошибка на стороне сервера', error: e.message });
    }
  }
};

const disLikeCard = async (req, res) => {
  try {
    const like = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail(
      () => new ErrorsProject('Карточка по заданному ID не найдена'),
    );
    return res.status(HttpCodes.create).send(like);
  } catch (e) {
    switch (e.name) {
      case 'CastError':
        return res.status(HttpCodes.notFoundId).send({ message: 'Передан не валидный ID' });
      case 'ErrorsProject':
        return res.status(e.statusCode).send(e.message);

      default:
        return res
          .status(HttpCodes.serverErr)
          .send({ message: 'Ошибка на стороне сервера', error: e.message });
    }
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  disLikeCard,
};
