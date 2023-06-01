const userRouter = require('express').Router();

const {
  getAllUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

userRouter.get('/users', getAllUsers);
userRouter.get('/users/:userId', getUser);
userRouter.post('/users', createUser);
userRouter.patch('users/me', updateUserInfo);
userRouter.patch('users/me/avatar', updateUserAvatar);

module.exports = userRouter;
