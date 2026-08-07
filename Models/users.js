const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
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
    gender: {
      type: String,
      required: true,
    },
    hasAdminAccess: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["superadmin", "storekeeper", "salesperson"],
      default: "user",
    },
  },
  //   Date created and updated at
  { timestamps: true },
);

// create model
const user = mongoose.model("user", userSchema);
module.exports = user;
