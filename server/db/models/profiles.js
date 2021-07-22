const mongoose = require('mongoose');

const profiles = mongoose.model("profiles", {
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  instruments: {
    type: Array,
  },
  skills: {
    type: Array,
  },
  description: {
    type: String,
  },
});

module.exports = profiles;