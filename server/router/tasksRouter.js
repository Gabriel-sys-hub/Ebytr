const express = require('express');

const router = express.Router();

const taskController = require('../controller/taskController');

router.post('/', taskController.saveTask);
router.get('/', taskController.getAllTasks);
router.put('/', taskController.updateTask);


module.exports = router;