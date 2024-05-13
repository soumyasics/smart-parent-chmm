const mongoose = require("mongoose");

const parentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true
    },
    parentalStatus: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);
const ParentModel = mongoose.model("parents", parentSchema);
module.exports = {ParentModel}
