const connection = require('./connection');

const REGISTERED_USERS = 'registered_users';

const login = async ({ email, password }) => {
  const db = await connection();
  return db.collection(REGISTERED_USERS).findOne({
    email,
    password,
  });
};

module.exports = {
  login,
};