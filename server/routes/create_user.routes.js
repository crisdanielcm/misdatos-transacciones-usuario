const express = require('express');
const app = express();
const userController = require('../controllers/user.controller');

app.post('/create_user', userController.create);

module.exports = app;