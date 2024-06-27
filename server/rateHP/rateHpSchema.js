const mongoose = require("mongoose");
const RateHPSchema = new mongoose.Schema(
  {
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
      required: true,
    },
    healthProfessionalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "healthprofessional",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const RateHPModel = mongoose.model("RateHP", RateHPSchema);
module.exports = { RateHPModel };
