const cardRouter = require('express').Router();

const {
  getAllCards,
  createCard,
  deleteCard,
  setLikeCard,
  removeLikeCard,
} = require('../controllers/cards');

cardRouter.get('/cards', getAllCards);
cardRouter.delete('/cards/:cardId', deleteCard);
cardRouter.post('/cards', createCard);
cardRouter.put('/cards/:cardId/likes', setLikeCard);
cardRouter.delete('/cards/:cardId/likes', removeLikeCard);

module.exports = cardRouter;
