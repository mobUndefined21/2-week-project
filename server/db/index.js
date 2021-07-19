const user = require('models/users');
const profile = require('models/profiles');

const getUser = async (id) => await user.findById(id);
const getAllUsers = async () => await user.find();
const createUser = async (userInput) => {
  const newUser = new user(userInput);
  try {
    const result = await newUser.save();
    return result;
  } catch (err) {
    return err;
  }
};
const deleteUser = async (id) => {
  try {
    const removedUser = await user.remove(id);
    return true;
  } catch (err) {
    return err;
  }
};

const updateUser = async (id, props) => {
  try {
    const updatedUser = await user.updateOne(id, props);
    return updatedUser;
  } catch (err) { 
    return err;
  }
};

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  deleteUser,
  updateUser,
}