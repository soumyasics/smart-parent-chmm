const { default: mongoose } = require("mongoose");
const { VCModel } = require("../VaccinationCenters/vcSchema");
const { VaccineModel } = require("./vaccineSchema");

const addNewVaccine = async (req, res) => {
  try {
    const {
      vaccinationCenterId,
      vaccineName,
      vaccineDescription,
      totalSlots,
      expiryDate,
      sideEffects,
      ageGroup,
      dosageMl,
    } = req.body;

    if (
      !vaccinationCenterId ||
      !vaccineName ||
      !vaccineDescription ||
      totalSlots === undefined ||
      !expiryDate ||
      !ageGroup ||
      !dosageMl
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided.",
      });
    }

    const vc = await VCModel.findById(vaccinationCenterId);

    if (!vc) {
      return res.status(400).json({
        success: false,
        message: "Vaccination center not found.",
      });
    }
    if (totalSlots < 0) {
      return res.status(400).json({
        success: false,
        message: "Number of available slots cannot be negative.",
      });
    }

    if (dosageMl <= 0) {
      return res.status(400).json({
        success: false,
        message: "Dosage must be greater than 0.",
      });
    }

    const newVaccine = new VaccineModel({
      vaccinationCenterId,
      vaccineName,
      vaccineDescription,
      totalSlots,
      expiryDate,
      sideEffects,
      ageGroup,
      dosageMl,
    });

    await newVaccine.save();
    const vcCenter = await VCModel.findByIdAndUpdate(
      vaccinationCenterId,
      {
        $push: { vaccines: newVaccine._id },
      },
      { new: true }
    );

    return res.status(200).json({ success: true, data: newVaccine, vcCenter });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllVaccinesByCenterId = async (req, res) => {
  try {
    const { id } = req.params;
    const vaccines = await VaccineModel.find({ vaccinationCenterId: id })
      .populate("vaccinationCenterId")
      .exec();
    res.status(200).json({ success: true, data: vaccines });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllVaccines = async (req, res) => {
  try {
    const vaccines = await VaccineModel.find()
      .populate("vaccinationCenterId")
      .exec();
    return res.status(200).json({ success: true, data: vaccines });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getVaccinesByNameAndCenterName = async (req, res) => {
  try {
    const { vaccineName, vaccineCenterName } = req.body;
    if (!vaccineName || !vaccineCenterName) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const vaccineCenter = await VCModel.findOne({
      name: vaccineCenterName,
    }).populate("vaccines");

    if (!vaccineCenter) {
      return res
        .status(404)
        .json({ success: false, message: "Vaccine center not found" });
    }
    const allVaccines = vaccineCenter.vaccines;

    const vaccinesfilterByName = allVaccines.filter(
      (vaccine) => vaccine.vaccineName === vaccineName
    );
    if (vaccinesfilterByName.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Vaccine slots not found" });
    }

    return res.status(200).json({ success: true, data: vaccinesfilterByName });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getVaccineById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid vaccine id" });
    }
    const vaccine = await VaccineModel.findById(id)
      .populate("bookedParents")
      .exec();
    if (!vaccine) {
      return res
        .status(404)
        .json({ success: false, message: "Vaccine not found" });
    }
    return res.status(200).json({ success: true, data: vaccine });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {
  addNewVaccine,
  getVaccineById,
  getAllVaccines,
  getAllVaccinesByCenterId,
  getVaccinesByNameAndCenterName,
};
