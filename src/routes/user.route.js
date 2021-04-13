const express = require('express');
const UserController = require('../controllers/user.controller');

const Router = express.Router();

Router.get('/user', UserController.index);
Router.get('/user/:id', UserController.getById);

Router.post('/user', UserController.store);

Router.delete('/user/:id', UserController.delete);

module.exports = Router;
