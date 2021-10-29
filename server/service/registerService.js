const model = require('../models/registerModel');

const findByEmail = async (email) => {
  const findUser = await model.findByEmail(email);
  return findUser;
};

const setUserRegister = async (email, password) => {
  const users = await model.setUserRegister(email, password);
  return users;
};

module.exports = {
  setUserRegister,
  findByEmail,
};