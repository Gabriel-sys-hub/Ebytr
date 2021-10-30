const service = require('../service/taskService');

const saveTask = async (req, res) => {
  const { task, email } = req.body;

  const createdAt = new Date();

  const result = await service.saveTask(task, email, createdAt);

  res.status(200).json(result);
};

module.exports = {
  saveTask,
}