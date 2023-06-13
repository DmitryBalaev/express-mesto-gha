const userRouter = require('express').Router();

const {
  getAllUsers,
  getUser,
  getCurrentUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');
const { validateUserId, validateUserUpdate, validateUserUpdateAvatar } = require('../utils/validationDataConfig');

userRouter.get('/users', getAllUsers);
userRouter.get('/users/:userId', validateUserId, getUser);
userRouter.get('/users/me', getCurrentUser);
userRouter.patch('/users/me', validateUserUpdate, updateUserInfo);
userRouter.patch('/users/me/avatar', validateUserUpdateAvatar, updateUserAvatar);

module.exports = userRouter;
