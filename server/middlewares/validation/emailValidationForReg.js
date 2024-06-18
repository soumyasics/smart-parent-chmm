const { ParentModel } = require("../../Parent/parentSchema");
const { HPModel } = require("../../HealthProfessionals/hpSchema");
const { VCModel } = require("../../VaccinationCenters/vcSchema");
const { AshaWorkerModel } = require("../../AshaWorker/AshaWorkerSchema");
const validateEmailForRegistration = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if email is already in use
    const existingParent = await ParentModel.findOne({ email });
    const existingHP = await HPModel.findOne({ email });
    const existingVC = await VCModel.findOne({ email });
    const existingAshaWorker = await AshaWorkerModel.findOne({ email });
    if (existingParent || existingHP || existingVC || existingAshaWorker) {
      return res.status(400).json({ message: "Email already in use" });
    }
    next();
  } catch (error) {
    console.error("Error in email validation middleware: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { validateEmailForRegistration };
