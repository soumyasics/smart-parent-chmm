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
    phoneNumber: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    isActive: {
      enum: ["active", "deactived", "suspended"],
      type: String,
      default: "active",
    },
    parentalStatus: {
      enum: ["Mother", "Father", "Expected"],
      type: String,
      default: "Mother",
    },
    profilePicture: {
      type: Object,
      default: null
    }
  },
  { timestamps: true }
);
const ParentModel = mongoose.model("parents", parentSchema);
module.exports = { ParentModel };
