const connection = require('./connection');

const REGISTERED_USERS = 'registered_users';

const findByEmail = async (email) => {
  const result = await connection()
    .then((db) => db.collection(REGISTERED_USERS).findOne({ email }))
    .then((response) => response)
    .catch(() => null);
  return result;
};

const setUserRegister = async (email, password, name, office) => {
  const role = 'user';
  const result = await connection()
    .then((db) => db.collection(REGISTERED_USERS).insertOne({ email, password, name, office, role }))
    .then((inserted) => inserted.insertedId)
    .catch(() => null);
  return { user: { email, role, name, office, _id: result.insertedId } };
};

module.exports = {
  setUserRegister,
  findByEmail,
};