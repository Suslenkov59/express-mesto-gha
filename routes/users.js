const userRouter = require('express').Router();

const {
  getUsers,
  getUserId,
  createUser,
  updateUserData,
  updateUserAvatar,
} = require('../controllers/users');

/* возвращает всех пользователей/по _id/создать */
userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserId);
userRouter.post('/', createUser);
/* Обновить профиль/аватар */
userRouter.patch('/me', updateUserData);
userRouter.patch('/me/avatar', updateUserAvatar);

module.exports = userRouter;
