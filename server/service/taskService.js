const taskModule = require('../models/taskModule');

const saveTask = async (task, email, createdAt) => {
  const result = await taskModule.saveTask(task, email, createdAt);

  return result;
};

const updateTask = async (id, task, status) => {
  const result = await taskModule.updateTask(id, task, status);

  return result;
}

const updateTaskStatus = async (id, status) => {
  const result = await taskModule.updateTaskStatus(id, status);

  return result;
}

const getAllTasks = async (email) => {
  const result = await taskModule.getAllTasks(email);
  return result;
}


const deleteTask = async (id) => {
  const result = await taskModule.deleteTask(id);

  return result;
}

module.exports = {
  saveTask,
  updateTask,
  getAllTasks,
  deleteTask,
  updateTaskStatus
}