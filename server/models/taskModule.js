const connection = require('./connection');
const TASK = 'tasks';


const saveTask = async (task, email, createdAt) => {
  const result = await connection()
    .then((db) => db.collection(TASK).insertOne({ task, email }))
    .then((inserted) => inserted.insertedId)
    .catch(() => null);

  return { tasks: { task, email, createdAt } };
};

module.exports = {
  saveTask,
}