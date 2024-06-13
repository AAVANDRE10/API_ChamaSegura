const authRouter = require('express').Router();
const controller = require('../../controllers/auth/auth');
//const authMiddleware = require('../../middlewares/auth');

authRouter.post('/signin', controller.signin);
authRouter.post('/signup', controller.signup);

authRouter.get('/user/:id',  controller.getUser);
authRouter.put('/updateuser/:id',  controller.updateUser);

module.exports = authRouter;