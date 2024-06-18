const mongoose = require("mongoose");

const ashaWorkerSchema = mongoose.Schema(
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
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    qualifications: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: Object,
      default: null,
    },
    isActive: {
      enum: ["active", "pending", "deactivated", "suspended"],
      type: String,
      default: "active",
    },
    isAdminApproved: {
      enum: ["pending", "approved", "rejected"],
      type: String,
      default: "pending",
    },

    joinedDate: {
      type: Date,
      default: Date.now,
    },
    feedback: {
      type: [Object],
      default: [],
    },
  },
  { timestamps: true }
);

const AshaWorkerModel = mongoose.model("AshaWorker", ashaWorkerSchema);
module.exports = { AshaWorkerModel };
