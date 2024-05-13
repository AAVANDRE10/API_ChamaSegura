const router = require('express').Router();
const authRouter = require('./auth/auth');
const burnsRouter = require('./burn/burns');

router.use('/auth', authRouter);
router.use('/burns', burnsRouter);

module.exports = router;