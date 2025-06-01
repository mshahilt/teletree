const bcrypt = require('bcrypt');
const userRepository = require('../repositories/user.repository');

const signupUser = async (userData) => {
  console.log("user data: ", userData);
  const { email, phone, password } = userData;

  const existingEmail = await userRepository.findByEmail(email);
  if (existingEmail) throw new Error('Email already registered');

  const existingPhone = await userRepository.findByPhone(phone);
  if (existingPhone) throw new Error('Phone number already registered');
  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = await userRepository.createUser({
    ...userData,
    password: hashedPassword
  });

  return createdUser;
};

const loginUser = async ({ phone, password }) => {
  const user = await userRepository.findByPhone(phone);
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  return user;
};

module.exports = {
  signupUser,
  loginUser
};
