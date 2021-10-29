const tasksRouter = require('../router/tasksRouter');
const express = require('express');

const app = express();
app.use(express.json());

app.use('/tasks', tasksRouter);

module.exports = app;
