const tasksRouter = require('../router/tasksRouter');
const loginRouter = require('../router/loginRouter');
const registerRouter = require('../router/registerRouter');
const express = require('express');

const app = express();
app.use(express.json());

app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/tasks', tasksRouter);

module.exports = app;
