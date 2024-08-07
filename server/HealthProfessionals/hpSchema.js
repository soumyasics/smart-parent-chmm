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
    address: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Dietitian", "Psychiatrist", "Fitness Specialist", "Physician"],
      required: true,
    },
    profilePicture: {
      type: Object,
      default: null,
    },
    certificateImg: {
      type: Object,
      default: null,
    },
    rating: {
      type: Number,
      default: 0,
    },
    appointmentFee: {
      type: Number,
      required: true,
    },
    subscribers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parent",
        default: null,
      },
    ],
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
  },
  { timestamps: true }
);
const HPModel = mongoose.model("healthprofessional", hpSchema);
module.exports = { HPModel };
