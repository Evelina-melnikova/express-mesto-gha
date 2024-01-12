const Router = require('express');
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
// eslint-disable-next-line import/extensions
} = require('../controllers/users.js');

const userRouter = Router();
userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', getUserById);
userRouter.post('/users', createUser);
userRouter.patch('/users/me', updateUser);
userRouter.patch('/users/me/avatar', updateUserAvatar);

module.exports = userRouter;
