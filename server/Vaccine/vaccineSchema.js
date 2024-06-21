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
    numberOfAvailableSlots: {
      type: Number,
      required: true,
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
    distributionStartingDateAndTime: {
      type: String,
      required: true,
    },
    distributionEndingDateAndTime: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

const VaccineModel = mongoose.model("Vaccine", vaccineSchema);

module.exports = { VaccineModel };
