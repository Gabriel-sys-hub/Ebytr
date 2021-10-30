const service = require('../service/taskService');

const saveTask = async (req, res) => {
  const { task, email } = req.body;

  const createdAt = new Date();

  if (!email) return res.status(400).json({ message: "User not loged in or does not exists!" })

  const result = await service.saveTask(task, email, createdAt);

  res.status(200).json(result);
};

module.exports = {
  saveTask,
}