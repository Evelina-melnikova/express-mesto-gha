/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
const Router = require('express');
const { celebrate } = require('celebrate');

const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

const { updateAvatarJoi, userIdJoi } = require('../joi/joi');

const userRouter = Router();
userRouter.get('/users', getUsers);
userRouter.patch('/users/me', updateUser);
userRouter.patch('/users/me/avatar', updateUserAvatar);
userRouter.get('/users/:userId', celebrate(userIdJoi), getUserById);
userRouter.patch('/users/me/avatar', celebrate(updateAvatarJoi), updateUserAvatar);

module.exports = userRouter;
