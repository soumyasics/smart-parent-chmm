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
      enum: ["active", "pending","deactived", "suspended"],
      type: String,
      default: "active",
    },
    
    profilePicture: {
      type: Object,
      default: null
    },
    certificate: {
      type: Object,
      required: true
    }
  },
  { timestamps: true }
);
const hpModel = mongoose.model("healthprofessionals", hpSchema);
module.exports = { hpModel };
