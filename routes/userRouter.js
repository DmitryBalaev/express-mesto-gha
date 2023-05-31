const userRouter = require('express').Router();

const {
  getAllUsers,
  getUser,
  createUser,
} = require('../controllers/users');

userRouter.get('/users', getAllUsers);
userRouter.get('/users/:userId', getUser);
userRouter.post('/users', createUser);

module.exports = userRouter;
