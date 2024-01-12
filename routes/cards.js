const Router = require('express');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  disLikeCard,
// eslint-disable-next-line import/extensions
} = require('../controllers/cards.js');

const cardRouter = Router();
cardRouter.get('/cards', getCards);
cardRouter.post('/cards', createCard);
cardRouter.delete('/cards/:cardId', deleteCard);
cardRouter.put('/cards/:cardId/likes', likeCard);
cardRouter.delete('/cards/:cardId/likes', disLikeCard);

module.exports = cardRouter;
