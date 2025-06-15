const User = require('../models/user.model');

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findByPhone = async (phone) => {
  return await User.findOne({ phone });
};

const createUser = async (userData) => {
  return await User.create(userData);
};

module.exports = {
  findByEmail,
  findByPhone,
  createUser
};
