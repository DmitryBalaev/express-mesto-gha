const User = require('../models/user');

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => console.log(err));

  // next();
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => console.log(err));

  // next();
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(() => res.status(201).send({ name, about, avatar }))
    .catch((err) => console.log(err));

  next();
};

module.exports = { getAllUsers, getUser, createUser };
