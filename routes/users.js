/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
const Router = require('express');
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

const userRouter = Router();
userRouter.get('/users', getUsers);
// userRouter.get('/users/:userId', getUserById);
// userRouter.post('/users', createUser);
userRouter.patch('/users/me', updateUser);
userRouter.patch('/users/me/avatar', updateUserAvatar);
userRouter.get('/users/:userId', celebrate(userIdJoi), getUserById);
userRouter.patch('/users/me/avatar', celebrate(upAvatarJoi), updateUserAvatar);

module.exports = userRouter;
