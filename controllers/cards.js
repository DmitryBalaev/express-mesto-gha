const mongoose = require('mongoose');

const Card = require('../models/card');

const { CastError, ValidationError } = mongoose.Error;

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: `Что-то пошло не так: ${err.message}` }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  console.log(req.user._id);

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: `Что-то пошло не так: ${err.message}` });
      }
    });
};

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
        res.status(400).send({ message: `Передан некорректный ID : ${req.params.cardId}` });
      } else if (err.message === 'NotValidId') {
        res.status(404).send({ message: `Передан несуществующий ID : ${req.params.cardId}` });
      } else {
        res.status(500).send({ message: `Что-то пошло не так: ${err.message}` });
      }
    });
};

const removeLikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new Error('NotValidId'))
    .then((card) => res.send({ data: card }))
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

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  setLikeCard,
  removeLikeCard,
};
