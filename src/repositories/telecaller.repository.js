const Telecaller = require('../models/telecaller.model');

const findByEmail = async (email) => {
  return await Telecaller.findOne({ email });
};

const findByPhone = async (phone) => {
  return await Telecaller.findOne({ phone });
};
const createUser = async (userData) => {
  return await Telecaller.create(userData);
};

module.exports = {
  findByEmail,
  findByPhone,
  createUser
};