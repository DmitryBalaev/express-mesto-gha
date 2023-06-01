const mongoose = require('mongoose');

const { ValidationError, CastError } = mongoose.Error;
const User = require('../models/user');

const {
  GENERAL_ERROR,
  RESOURCE_NOT_FOUND,
  BAD_REQUEST,
  STATUS_OK_CREATED,
  STATUS_OK,
} = require('../utils/constants');

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
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

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.status(STATUS_OK).send({ data: user });
      } else {
        res.status(RESOURCE_NOT_FOUND).send({ message: 'карточка или пользователь не найден или был запрошен несуществующий роут' });
      }
    })
    .catch((err) => {
      if (err instanceof CastError) {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(GENERAL_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((userData) => res.status(STATUS_OK_CREATED).send({ data: userData }))
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

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((updateUserData) => {
      if (!updateUserData) {
        res.status(RESOURCE_NOT_FOUND).send({ message: 'карточка или пользователь не найден или был запрошен несуществующий роут' });
      } else {
        res.send({ data: updateUserData });
      }
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(GENERAL_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((updateUserData) => {
      if (!updateUserData) {
        res.status(RESOURCE_NOT_FOUND).send({ message: 'карточка или пользователь не найден или был запрошен несуществующий роут' });
      } else {
        res.send({ data: updateUserData });
      }
    })
    .catch((err) => {
      if (err instanceof CastError) {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(GENERAL_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
