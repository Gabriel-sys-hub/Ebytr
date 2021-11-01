const taskModule = require('../models/taskModule');

const saveTask = async (task, email, createdAt) => {
  const result = await taskModule.saveTask(task, email, createdAt);

  return result;
};

const updateTask = async (id) => {
  const result = await taskModule.updateTask(id);

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
  deleteTask
}