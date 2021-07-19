const mongoose = require('mongoose');

const profiles = mongoose.model("profiles", {
  name: {
    type: String,
    required: true,
    // in api: user = profile.user_id; profile.name = user.firstName + user.lastName 
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

module.exports = profiles;