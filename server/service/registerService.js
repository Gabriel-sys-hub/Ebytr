const model = require('../models/registerModel');

const findByEmail = async (email) => {
  const findUser = await model.findByEmail(email);
  return findUser;
};

const setUserRegister = async (email, password, name, office) => {
  const users = await model.setUserRegister(email, password, name, office);
  return users;
};

module.exports = {
  setUserRegister,
  findByEmail,
};