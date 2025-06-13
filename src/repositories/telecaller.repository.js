const Telecaller = require('../models/telecaller.model');

const getAll = async() => {
  return await Telecaller.find().populate({
    path: 'userId',
    select: '-email -phone'
  });
}

const getWorkerContactDetails = async (id) => {
  const data = await Telecaller.findById(id).populate({
    path: "userId",
    select: "email phone"
  });

  return data?.userId || null;
}


const findById = async (id) => {
  return await Telecaller.findById(id).populate("userId");
}

const createUser = async (userData) => {
  return await Telecaller.create(userData);
};

module.exports = {
  findById,
  createUser,
  getAll,
  getWorkerContactDetails
};