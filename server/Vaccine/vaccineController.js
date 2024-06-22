const { VaccineModel } = require("./vaccineSchema");

const addNewVaccine = async (req, res) => {
  try {
    const {
      vaccinationCenterId,
      vaccineName,
      vaccineDescription,
      numberOfAvailableSlots,
      expiryDate,
      sideEffects,
      ageGroup,
      dosageMl,
    } = req.body;

    if (
      !vaccinationCenterId ||
      !vaccineName ||
      !vaccineDescription ||
      numberOfAvailableSlots === undefined ||
      !expiryDate ||
      !ageGroup ||
      !dosageMl
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided.",
      });
    }

    if (numberOfAvailableSlots < 0) {
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
      numberOfAvailableSlots,
      expiryDate,
      sideEffects,
      ageGroup,
      dosageMl
    });
    await newVaccine.save();

    return res.status(200).json({ success: true, data: newVaccine });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllVaccinesByCenterId = async (req, res) => {
  try {
    const { id } = req.params;
    const vaccines = await VaccineModel.find({ vaccinationCenterId: id });
    res.status(200).json({ success: true, data: vaccines });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllVaccines = async (req, res) => {
  try {
    const vaccines = await VaccineModel.find();
    return res.status(200).json({ success: true, data: vaccines });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  addNewVaccine,
  getAllVaccines,
  getAllVaccinesByCenterId,
};
