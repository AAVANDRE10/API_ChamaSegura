const authRouter = require('express').Router();
const controller = require('../../controllers/auth/auth');
const authMiddleware = require('../../middlewares/auth');

authRouter.post('/signin', controller.signin);
authRouter.post('/signup', controller.signup);

authRouter.get('/user/:id', authMiddleware, controller.getUser);
authRouter.put('/UpdateUser/:id', authMiddleware, controller.updateUser);
module.exports = authRouter;