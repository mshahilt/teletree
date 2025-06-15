const Telecaller = require('../models/telecaller.model');

const getAll = async() => {
  return await Telecaller.find().populate({
    path: 'userId',
    select: '-email -phone'
  });
}
const searchTelecallers = async (filters) => {
  const matchStage = {};

  if (filters.gender) {
    matchStage.gender = filters.gender;
  }

  if (filters.jobCategory) {
    matchStage.jobCategory = { $regex: filters.jobCategory, $options: 'i' };
  }

  if (filters.languages) {
    matchStage.languages = { $regex: filters.languages, $options: 'i' };
  }

  if (filters.age) {
    matchStage.age = { $gte: parseInt(filters.age) };
  }

  if (filters.experience) {
    matchStage.experience = { $gte: parseInt(filters.experience) };
  }

  const pipeline = [
    { $match: matchStage },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user',
      },
    },
    { $unwind: '$user' },
  ];

  if (filters.district) {
    pipeline.push({
      $match: {
        'user.district': { $regex: filters.district, $options: 'i' },
      },
    });
  }

  pipeline.push({
    $project: {
      experience: 1,
      profilePhoto: 1,
      age: 1,
      gender: 1,
      languages: 1,
      jobCategory: 1,
      user: {
        name: 1,
        district: 1,
        phone: 1,
        email: 1,
        address: 1,
      },
    },
  });

  return await Telecaller.aggregate(pipeline);
};


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
  getWorkerContactDetails,
  searchTelecallers
};