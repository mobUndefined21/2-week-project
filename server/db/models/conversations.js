const mongoose = require('mongoose');

const conversations = mongoose.model("conversations", {
  participants: {
    type: Array,
    required: true,
  },
  messages: {
    type: Array,
  },
  created: {
    type: String,
    required: true,
  },
});

module.exports = conversations;