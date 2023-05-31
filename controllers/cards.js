const Card = require('../models/card');

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => console.log(err));

  next();
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  console.log(req.user._id);

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => console.log(err));

  next();
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((foundCard) => Card.deleteOne(foundCard)
      .then(() => res.send({ message: foundCard })))
    .catch((err) => console.log(err));

  next();
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
};
