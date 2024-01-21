const Router = require('express');
const userRouter = require('./users');
const adminsRouter = require('./admin');
const auth = require('../middlewares/authorization');
const cardRouter = require('./cards');

const router = Router();
router.use(auth);
router.use('/', userRouter);
router.use('/', adminsRouter);
router.use('/', cardRouter);

module.exports = router;
