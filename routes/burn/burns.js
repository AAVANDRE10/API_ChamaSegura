const burnRouter = require('express').Router();
const controller = require('../../controllers/burn/burn');
const authMiddleware = require('../../middlewares/auth');

//use auth middleware
burnRouter.use(authMiddleware);

//burns CRUD
burnRouter.get('/', controller.getAll); //read all
burnRouter.get('/:number', controller.getById); //read one by his id (burn number)
burnRouter.get('/user/:id', controller.getByUser); //read one by his id (burn number)
burnRouter.post('/create', controller.create); //create new burn
burnRouter.delete('/delete/:number', controller.delete); //delete burn

module.exports = burnRouter;