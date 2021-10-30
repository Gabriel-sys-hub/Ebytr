const taskModule = require('../models/taskModule');

const saveTask = async (task, email, createdAt) => {
  const result = await taskModule.saveTask(task, email, createdAt);

  return result;
};

module.exports = {
  saveTask,
}