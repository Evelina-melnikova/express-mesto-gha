const Router = require('express');
const userRouter = require('./users');
// eslint-disable-next-line import/no-unresolved, import/extensions
const adminsRouter = require('./admins');
// eslint-disable-next-line no-unused-vars, import/no-unresolved, import/extensions
const auth = require('../middlewares/auth');

const router = Router();

router.use('/', auth, userRouter);
router.use('/', adminsRouter);
router.use('/', auth, adminsRouter);

module.exports = router;
