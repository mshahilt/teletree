const Telecaller = require('../models/telecaller.model');

const getAll = async() => {
  return await Telecaller.find().populate({
    path: 'userId',
    select: '-email -phone'
  });
}
const searchTelecallers = async (filters) => {
  const query = {};
  console.log("filters", filters);
  console.log(filters.age);

  if (filters.district) {
    query['district'] = filters.district;
  }

  if (filters.experience) {
    const [minExp, maxExp] = filters.experience.split('-').map(Number);
    query.experience = { $gte: minExp, $lte: maxExp };
  }

  if (filters.location) {
    const words = filters.location.trim().split(/\s+/);
    const regexPattern = words.join('|');
    query['address.fullAddress'] = { $regex: regexPattern, $options: 'i' };
  }

  if (filters.pincode) {
    query['address.pincode'] = filters.pincode;
  }

  if (filters.age) {
    const [minAge, maxAge] = filters.age.split('-').map(Number);
    query.age = { $gte: minAge, $lte: maxAge };
  }

  if (filters.gender) {
    query.gender = filters.gender;
  }

  if (filters.jobCategory) {
    query.jobCategory = filters.jobCategory;
  }
console.log("query", query);
console.log("filters", filters);
  // Add workType filter
  if (filters.workType) {
    query.workType = filters.workType;
  }

  const telecallers = await Telecaller.find(query)
    .populate({
      path: 'userId',
      select: 'name'
    })
    .lean();
 
  return telecallers;
};



const getWorkerContactDetails = async (id) => {
  const data = await Telecaller.findById(id).populate({
    path: "userId",
    select: "email phone"
  });
  const filteredData = {
    email: data?.userId?.email,
    phone: data?.userId?.phone,
    cvFileName: data.cv,
    certificateFileName: data.experienceCertificate
  }
  return filteredData || null;
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