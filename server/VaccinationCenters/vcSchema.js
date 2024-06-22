const mongoose = require("mongoose");

const vcSchema = mongoose.Schema(
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
    category: {
      enum: ["anganvadi", "hospital"],
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
      enum: [
        "Trivandrum",
        "Kollam",
        "Alappuzha",
        "Pathanamthitta",
        "Kottayam",
        "Idukki",
        "Ernakulam",
        "Thrissur",
        "Palakkad",
        "Malappuram",
        "Kozhikode",
        "Wayanad",
        "Kannur",
        "Kasaragod",
      ],
    },
    profilePicture: {
      type: Object,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isAdminApproved: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    vaccines: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vaccine",
        default: null,
      }
    ]
  },
  { timestamps: true }
);
const VCModel = mongoose.model("VaccinationCenter", vcSchema);
module.exports = { VCModel };
