const cardRouter = require('express').Router();

const {
  getAllCards,
  createCard,
  deleteCard,
  setLikeCard,
  removeLikeCard,
} = require('../controllers/cards');
const { validateNewCard, validateCardId } = require('../utils/validationDataConfig');

cardRouter.get('/cards', getAllCards);
cardRouter.delete('/cards/:cardId', validateCardId, deleteCard);
cardRouter.post('/cards', validateNewCard, createCard);
cardRouter.put('/cards/:cardId/likes', validateCardId, setLikeCard);
cardRouter.delete('/cards/:cardId/likes', validateCardId, removeLikeCard);

module.exports = cardRouter;
