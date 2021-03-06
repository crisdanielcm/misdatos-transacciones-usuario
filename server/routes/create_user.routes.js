const express = require('express');
const app = express();
const userController = require('../controllers/user.controller');

app.post('/create_user', userController.create);
app.get('/transaction_history', userController.getTransactionHistory);
app.get('/points', userController.getPoints);

module.exports = app;