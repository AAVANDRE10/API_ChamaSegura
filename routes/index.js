const router = require('express').Router();
const authRouter = require('./auth/auth');
const burnsRouter = require('./burn/burns');
const municipalityRouter = require('./municipality/municipality');

router.use('/auth', authRouter);
router.use('/burns', burnsRouter);
router.use('/municipality', municipalityRouter);

module.exports = router;