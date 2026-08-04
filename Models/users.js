const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  //   Date created and updated at
  timestamps: true,
});
// create model
const user = mongoose.model("user", userSchema);
