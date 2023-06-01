const mongoose = require('mongoose');

const Card = require('../models/card');

const { CastError, ValidationError } = mongoose.Error;

const {
  GENERAL_ERROR,
  RESOURCE_NOT_FOUND,
  BAD_REQUEST,
  STATUS_OK_CREATED,
  STATUS_OK,
} = require('../utils/constants');

const getAllCards = (req, res) => {
  Card.find({})
    .orFail(new Error('NotValidId'))
    .then((cards) => res.status(STATUS_OK).send({ data: cards }))
    .catch((err) => {
      if (err instanceof CastError) {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotValidId') {
        res.status(RESOURCE_NOT_FOUND).send({ message: 'карточка или пользователь не найден или был запрошен несуществующий роут' });
      } else {
        res.status(GENERAL_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(STATUS_OK_CREATED).send({ data: card }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotValidId') {
        res.status(RESOURCE_NOT_FOUND).send({ message: 'карточка или пользователь не найден или был запрошен несуществующий роут' });
      } else {
        res.status(GENERAL_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// const deleteCard = (req, res) => {
//   Card.findByIdAndDelete(req.params.cardId)
//     .orFail(new Error('NotValidId'))
//     .then((deletedCard) => res.send({ message: deletedCard }))
//     .catch((err) => {
//       if (err instanceof CastError) {
//         res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
//       } else if (err.message === 'NotValidId') {
//         res.status(RESOURCE_NOT_FOUND).send({ message: 'карточка или пользователь не найден или был запрошен несуществующий роут' });
//       } else {
//         res.status(GENERAL_ERROR).send({ message: 'На сервере произошла ошибка' });
//       }
//     });
// };

const deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail(new Error('NotValidId'))
    .then((foundCard) => Card.deleteOne(foundCard)
      .then(() => res.send({ message: foundCard })))
    .catch((err) => {
      if (err instanceof CastError) {
        res.status(400).send({ message: `Передан некорректный ID : ${req.params.cardId}` });
      } else if (err.message === 'NotValidId') {
        res.status(404).send({ message: `Передан несуществующий ID : ${req.params.cardId}` });
      } else {
        res.status(500).send({ message: `Что-то пошло не так: ${err.message}` });
      }
    });
};

const setLikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new Error('NotValidId'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err instanceof CastError) {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotValidId') {
        res.status(RESOURCE_NOT_FOUND).send({ message: 'карточка или пользователь не найден или был запрошен несуществующий роут' });
      } else {
        res.status(GENERAL_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const removeLikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new Error('NotValidId'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err instanceof CastError) {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotValidId') {
        res.status(RESOURCE_NOT_FOUND).send({ message: 'карточка или пользователь не найден или был запрошен несуществующий роут' });
      } else {
        res.status(GENERAL_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  setLikeCard,
  removeLikeCard,
};
