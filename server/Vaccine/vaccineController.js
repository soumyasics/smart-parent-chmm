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
      distributionStartingDateAndTime,
      distributionEndingDateAndTime,
    } = req.body;

    if (
      !vaccinationCenterId ||
      !vaccineName ||
      !vaccineDescription ||
      numberOfAvailableSlots === undefined ||
      !expiryDate ||
      !ageGroup ||
      !dosageMl ||
      !distributionStartingDateAndTime ||
      !distributionEndingDateAndTime
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

    const startingTime = new Date(distributionStartingDateAndTime);
    const endingTime = new Date(distributionEndingDateAndTime);

    if (isNaN(startingTime.getTime()) || isNaN(endingTime.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid distribution start or end date and time.",
      });
    }
    if (startingTime >= endingTime) {
      return res.status(400).json({
        success: false,
        message:
          "Distribution start date and time must be before distribution end date and time.",
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
      dosageMl,
      distributionStartingDateAndTime,
      distributionEndingDateAndTime,
    });
    await newVaccine.save();

    res.status(200).json({ success: true, data: newVaccine });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllVaccinesByCenter = async (req, res) => {
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
  getAllVaccinesByCenter,
};
