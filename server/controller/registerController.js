const service = require('../service/registerService');

const setUserRegister = async (req, res) => {
  const { email, password } = req.body;

  const checkIfemailExists = await service.findByEmail(email);

  if (!checkIfemailExists) {
    const user = await service.setUserRegister(email, password);
    return res.status(201).json(user);
  }

  return res.status(409).json({ message: 'Email already registered' });
};

module.exports = {
  setUserRegister,
};
