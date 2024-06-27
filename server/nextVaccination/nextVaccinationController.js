const mongoose = require("mongoose");
const { NextVaccinationModel } = require("./nextVaccinationSchema");
const { VCModel } = require("../VaccinationCenters/vcSchema");
const { ParentModel } = require("../Parent/parentSchema");

const createVaccinationSchedule = async (req, res) => {
  try {
    const { vaccinationCenterId, parentId, nextBookingDate, message } =
      req.body;

    if (!vaccinationCenterId || !parentId || !nextBookingDate || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (
      !mongoose.isValidObjectId(vaccinationCenterId) ||
      !mongoose.isValidObjectId(parentId)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid vaccination center or parent ID." });
    }

    const vc = await VCModel.findById(vaccinationCenterId);
    if (!vc) {
      return res.status(404).json({ message: "Vaccination center not found." });
    }
    const parent = await ParentModel.findById(parentId);

    if (!parent) {
      return res.status(404).json({ message: "Parent not found." });
    }

    // older parents don't have this fields
    if (typeof parent.isVaccinated === "undefined") {
      parent.isVaccinated = true;
    }
    const nextVaccination = new NextVaccinationModel({
      vaccinationCenterId,
      parentId,
      nextBookingDate,
      message,
    });
    parent.isVaccinated = true;
    await parent.save();
    await nextVaccination.save();
    return res.status(200).json({
      message: "Vaccination schedule created successfully.",
      nextVaccination,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error on create vaccination schedule.",
      error: error.message,
    });
  }
};

const getVaccinationSchedule = async (req, res) => {
  try {
    const nextVaccination = await NextVaccinationModel.find();
    return res.status(200).json({ nextVaccination });
  } catch (error) {
    return res.status(500).json({
      message: "Error on get vaccination schedule.",
      error: error.message,
    });
  }
};

const getVaccinationScheduleByParentId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Id is not valid" });
    }

    const parent = await ParentModel.findById(id);
    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }
    const nextVaccination = await NextVaccinationModel.find({
      parentId: id,
    })
      .populate("vaccinationCenterId")
      .populate("parentId")
      .exec();
    return res.status(200).json({
      message: "Next vaccination schedule by parent id",
      data: nextVaccination,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error on get vaccination schedule by parent id.",
      error: error.message,
    });
  }
};
module.exports = {
  createVaccinationSchedule,
  getVaccinationSchedule,
  getVaccinationScheduleByParentId,
};
