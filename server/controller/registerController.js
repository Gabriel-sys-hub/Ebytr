const service = require('../service/registerService');

const setUserRegister = async (req, res) => {
  const { email, password, name, office } = req.body;

  console.log(email, password, name, office)

  const checkIfemailExists = await service.findByEmail(email);

  if (!checkIfemailExists) {
    const user = await service.setUserRegister(email, password, name, office);
    return res.status(201).json(user);
  }

  return res.status(409).json({ message: 'Email already registered' });
};

module.exports = {
  setUserRegister,
};
