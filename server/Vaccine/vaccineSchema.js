const mongoose = require("mongoose");

const vaccineSchema = new mongoose.Schema(
  {
    vaccinationCenterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VaccinationCenter",
      required: true,
    },
    vaccineName: {
      type: String,
      required: true,
      trim: true,
    },
    vaccineDescription: {
      type: String,
      required: true,
      trim: true,
    },
    totalSlots: {
      type: Number,
      required: true,
      min: 0,
    },
    bookedSlots: {
      type: Number,
      default: 0,
      min: 0,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    sideEffects: {
      type: String,
      default: "",
    },
    ageGroup: {
      type: String,
      required: true,
      trim: true,
    },
    dosageMl: {
      type: Number,
      required: true,
    },
  
    bookedParents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parent",
        default: null,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const VaccineModel = mongoose.model("Vaccine", vaccineSchema);

module.exports = { VaccineModel };
