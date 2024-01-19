const Router = require('express');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  disLikeCard,
} = require('../controllers/cards');

const cardRouter = Router();
// eslint-disable-next-line no-unused-vars, import/no-unresolved, import/extensions
const { createCardJoi, cardIdJoi } = require('../joi/joi');

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', createCard);
cardRouter.delete('/cards/:cardId', deleteCard);
cardRouter.put('/cards/:cardId/likes', likeCard);
cardRouter.delete('/cards/:cardId/likes', disLikeCard);

module.exports = cardRouter;
