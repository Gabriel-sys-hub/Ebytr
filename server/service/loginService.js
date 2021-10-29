const loginModel = require('../models/loginModel');

const UNAUTHORIZED = 401;

const login = async ({ email, password }) => {
  const response = await loginModel.login({ email, password });
  if (!response) return UNAUTHORIZED;
  return response;
};

module.exports = {
  login,
};