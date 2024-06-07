
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
    contact: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
        enum: ["anganvadi","hospital"],

      type: String,
      required: true,
    },
    isActive: {
  
      type: Boolean,
      default:false,
    },
  
    profilePicture: {
      type: Object,
      default: null
    }
  },
  { timestamps: true }
);
const  vcModel = mongoose.model("vaccinationcenters", vcSchema);
module.exports = { vcModel };








