const mongoose = require('mongoose');

const users = mongoose.model("Users", {
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  authToken: {
    type: String
  }
});

module.exports = users;