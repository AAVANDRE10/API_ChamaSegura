const burnRouter = require('express').Router();
const controller = require('../../controllers/burn');
const authMiddleware = require('../../middlewares/auth');

//use auth middleware
burnRouter.use(authMiddleware);

//students CRUD
burnRouter.get('/', controller.getAll); //read all
burnRouter.get('/:number', controller.getById); //read one by his id (student number)
burnRouter.post('/create', controller.create); //create new student
burnRouter.put('/update', controller.update); //update student
burnRouter.delete('/delete/:number', controller.delete); //delete student

module.exports = burnRouter;