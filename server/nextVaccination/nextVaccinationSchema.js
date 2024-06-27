const mongoose = require("mongoose");
const { Schema } = mongoose;

const nextVaccination = new Schema({
  vaccinationCenterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VaccinationCenter",
    required: true,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parent",
    required: true,
  },
  nextBookingDate: {
    type: Date,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});
const NextVaccinationModel = mongoose.model("NextVaccination", nextVaccination);
module.exports = { NextVaccinationModel };
