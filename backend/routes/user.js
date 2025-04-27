const express = require('express');
const UserRouter = express.Router();
const userController = require('../controllers/user');

UserRouter.post('/', userController.createUser);
UserRouter.get('/', userController.getUsers);
UserRouter.get('/:id', userController.getUserById);
UserRouter.put('/:id', userController.updateUser);
UserRouter.delete('/:id', userController.deleteUser);

module.exports = UserRouter;