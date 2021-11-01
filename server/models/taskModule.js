const { ObjectId } = require('bson');
const connection = require('./connection');
const TASK = 'tasks';


const saveTask = async (task, email, createdAt) => {
  const id = await connection()
    .then((db) => db.collection(TASK).insertOne({ task, email }))
    .then((inserted) => inserted.insertedId)
    .catch(() => null);

  return { tasks: { task, email, createdAt, id} };
};

const updateTask = async (id) => {
  const updatedTask = await connection()
    .then((db) => db.collection(TASK).updateOne({ id }))
    .then((result) => result)
    .catch(() => null);
  
  return updatedTask;
}

const getAllTasks = async (email) => {
  const allTasks = await connection()
    .then((db) => db.collection(TASK).find({email}).toArray())
    .then((result) => result)
  
  return allTasks;
}

const deleteTask = async (id) => {
  await connection()
    .then((db) => db.collection(TASK).deleteOne({_id: ObjectId(id)}))
    .then((result) => console.log(result))
  
  return { _id: id };
}

module.exports = {
  saveTask,
  updateTask,
  getAllTasks,
  deleteTask
}