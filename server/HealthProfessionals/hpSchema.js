const mongoose = require("mongoose");

const hpSchema = mongoose.Schema(
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
    category: {
      type: String,
      required: true,
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

    profilePicture: {
      type: Object,
      default: null,
    },
    certificateImg: {
      type: Object,
      default: null,
    },
  },
  { timestamps: true }
);
const HPModel = mongoose.model("healthprofessional", hpSchema);
module.exports = { HPModel };
