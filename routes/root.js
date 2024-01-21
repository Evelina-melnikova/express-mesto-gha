const Router = require('express');
const userRouter = require('./users');
const adminsRouter = require('./admin');
const auth = require('../middlewares/authorization');

const router = Router();
router.use('/', adminsRouter);
router.use(auth);
router.use('/', userRouter);
router.use('/', adminsRouter);

module.exports = router;
