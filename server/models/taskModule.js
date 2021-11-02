const { ObjectId } = require('bson');
const connection = require('./connection');
const TASK = 'tasks';


const saveTask = async (task, email, createdAt) => {
  const pending = 'Pending';
  const id = await connection()
    .then((db) => db.collection(TASK).insertOne({ task, email, createdAt, status: pending }))
    .then((inserted) => inserted.insertedId)
    .catch(() => null);

  return { tasks: { id, email, createdAt, status: pending } };
};

const updateTask = async (id, task, status) => {
  
  const updatedTask = await connection()
    .then((db) => db.collection(TASK).updateOne({ _id: ObjectId(id) }, { $set: { task: task }}))
    .then((result) => result)
    .catch(() => null);
  
  return updatedTask;
}


const updateTaskStatus = async (id, status) => {
  
  const updatedTask = await connection()
    .then((db) => db.collection(TASK).updateOne({ _id: ObjectId(id) }, { $set: { status: status }}))
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
  deleteTask,
  updateTaskStatus
}