const mongoose = require('mongoose');
const User = require('../models/user');
const {
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_SERVER,
} = require('../utils/status');

const { ValidationError, CastError } = mongoose.Error;

/* Получение списка пользователей */
const getUsers = (req, res) => {
  User.find({})
    .then((userList) => res.send({ data: userList }))
    .catch(() => {
      res
        .status(ERROR_SERVER)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

/* Получение пользователя по ID */
const getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((selectedUser) => {
      if (selectedUser) {
        res.send({ data: selectedUser });
      } else {
        res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' });
      }
    })
    .catch((error) => {
      if (error instanceof CastError) {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Некорректный _id запрашиваемого пользователя' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

/* Создание пользователя */
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((userObject) => res.send({ data: userObject }))
    .catch((error) => {
      if (error instanceof ValidationError) {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

/* Обновление профиля пользователя */
const updateUserData = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((updatedData) => res.send({ data: updatedData }))
    .catch((error) => {
      if (error instanceof ValidationError) {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

/* Обновление аватара пользователя */
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((updatedAvatar) => res.send({ data: updatedAvatar }))
    .catch((error) => {
      if (error instanceof ValidationError) {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении аватара' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  getUsers, getUserId, createUser, updateUserData, updateUserAvatar,
};
