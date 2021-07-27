const user = require('./models/users');
const profile = require('./models/profiles');
const conversations = require('./models/conversations');

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

const newConversation = async (participants) => {
  try {
    const userConversation = await conversations.findOne({'conversations.participants': { $all: participants } });
    if (userConversation) return userConversation._id;

    const conversation = await conversations.create({ participants, created: Date.now() })
    console.log(`No conversation found, creating new one, id: ${conversation._id}`)
    return conversation._id;
  } catch (err) { 
    throw err;
  }
};

const getConversations = async (profileId) => {
  try {
    const userConversations = profileId !== 'getAll'
    ? await conversations.find({participants: { $in: [profileId] } })
    : await conversations.find();

    return userConversations.map(({_id}) => _id);
  } catch (err) { 
    throw err;
  }
};

const getConversationByParticipants = async (participants) => {
  try {
    const userConversations = await conversations.find({participants: { $in: participants } });
    return userConversations.map(({_id}) => _id);
  } catch (err) { 
    throw err;
  }
};

const getConversationById = async (conversationId) => {
  try {
    const conversation = await conversations.findOne({_id: conversationId});
    return conversation;
  } catch (err) {
    throw err;
  }
};

const getMessages = async (conversationId, ts) => {
  try {
    const conversation = await conversations.findOne({ _id: conversationId });
    const newMessages = conversation.messages.filter(msg => msg.ts > ts);
    return newMessages;
  } catch (err) { 
    throw err;
  }
};

const postMessage = async (body, conversationId, profileId) => {
  try {
    const newMessage = {
      profileId,
      body,
      ts: Date.now(),
    }
    await conversations.updateOne({ _id: conversationId }, { $push: { messages: newMessage } });
    return newMessage;
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
  },
  messages: {
    getMessages,
    postMessage,
    newConversation,
    getConversations,
    getConversationById,
    getConversationByParticipants,
  }
}
