const cardRouter = require('express').Router();

const {
  getAllCards,
  createCard,
  deleteCard,
} = require('../controllers/cards');

cardRouter.get('/cards', getAllCards);
cardRouter.delete('/cards/:cardId', deleteCard);
cardRouter.post('/cards', createCard);

module.exports = cardRouter;
