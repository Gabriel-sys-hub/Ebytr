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

const deleteTask = async (req, res) => {
  const { id } = req.params;

  const result = await service.deleteTask(id);

  return res.status(200).json(result);
}

const updateTask = async (req, res) => {
  const { id, task} = req.body;

  console.log(id, task)

  const result = await service.updateTask(id, task )

  if (id === undefined) return res.status(400).json({ message: "Task does not exists!" })

  return res.status(200).json(result);
}

const updateTaskStatus = async (req, res) => {
  const { id: { id, status}} = req.body;

  const result = await service.updateTaskStatus(id, status)

  if (id === undefined) return res.status(400).json({ message: "Task does not exists!" })

  return res.status(200).json(result);
}

module.exports = {
  saveTask,
  updateTask,
  getAllTasks,
  deleteTask,
  updateTaskStatus
}