const tasksRouter = require('../router/tasksRouter');
const loginRouter = require('../router/loginRouter');
const registerRouter = require('../router/registerRouter');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cors());

app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/tasks', tasksRouter);

module.exports = app;
