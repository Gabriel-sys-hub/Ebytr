const service = require('../service/taskService');

const saveTask = async (req, res) => {
  const { task, email } = req.body;

  const createdAt = new Date();

  if (!email) return res.status(400).json({ message: "User not loged in or does not exists!" })

  const result = await service.saveTask(task, email, createdAt);

  res.status(200).json(result);
};

const getAllTasks = async (req, res) => {
  const { email } = req.params;

  const result = await service.getAllTasks(email);

  return res.status(200).json(result);
}

const updateTask = async (req, res) => {
  
  const tasks = await getAllTasks();

  const findTaskWithId = tasks.find((newId) => tasks.id === newId);

  console.log(findTaskWithId);

  if (findTaskWithId === null) return false; 

  const result = await service.updateTask(findTaskWithId)

  return res.status(200).json(result);
}

module.exports = {
  saveTask,
  updateTask,
  getAllTasks,
}