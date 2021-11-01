const express = require('express');

const router = express.Router();

const taskController = require('../controller/taskController');

router.post('/', taskController.saveTask);
router.get('/:email', taskController.getAllTasks);
router.delete('/:id', taskController.deleteTask)
router.put('/', taskController.updateTask);


module.exports = router;