const Router = require('express');

const userRouter = require('./users');

const cardRouter = require('./cards');

const router = Router();

router.use('/', userRouter);
router.use('/', cardRouter);

module.exports = router;
