const user = require('./models/users');
const profile = require('./models/profiles');

const createUser = async (userInput) => {
  const newUser = new user(userInput);
  try {
    const result = await newUser.save();
    return result;
  } catch (err) {
    throw err;
  }
};

const getUser = async (query) => await user.findOne(query);

const findUsers = async (query, select = null) => await user.find(query, select);

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

const getProfile = async (query) => await profile.findOne(query);

const findProfiles = async (query) => await profile.find(query);

const createProfile = async (profileInput) => {
  const newProfile = new profile(profileInput);
  try {
    const result = await newProfile.save();
    return result;
  } catch (err) {
    throw err;
  }
};

const deleteProfile = async (query) => {
  try {
    const removedProfile = await profile.remove(query);
    return true;
  } catch (err) {
    throw err;
  }
};

const updateProfile = async (query, props) => {
  try {
    const updatedProfile = await profile.updateOne(query, props);
    return updatedProfile;
  } catch (err) { 
    throw err;
  }
};

module.exports = {
  users: {
    createUser,
    getUser,
    findUsers,
    deleteUser,
    updateUser,
  },
  profiles: {
    createProfile,
    getProfile,
    findProfiles,
    deleteProfile,
    updateProfile,
  }
}
