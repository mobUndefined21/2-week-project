const user = require('./models/users');
const profile = require('./models/profiles');

const getUser = async (query) => await user.findOne(query);
const findUsers = async (query) => await user.find(query);
const createUser = async (userInput) => {
  const newUser = new user(userInput);
  try {
    const result = await newUser.save();
    return result;
  } catch (err) {
    throw err;
  }
};
const deleteUser = async (query) => {
  try {
    const removedUser = await user.remove(query);
    return true;
  } catch (err) {
    throw err;
  }
};

const updateUser = async (query, props) => {
  try {
    const updatedUser = await user.updateOne(query, props);
    return updatedUser;
  } catch (err) { 
    throw err;
  }
};

module.exports = {
  createUser,
  getUser,
  findUsers,
  deleteUser,
  updateUser,
}