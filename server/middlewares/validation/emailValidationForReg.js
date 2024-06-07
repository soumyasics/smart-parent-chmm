const { ParentModel } = require("../../Parent/parentSchema");
const { HPModel } = require("../../HealthProfessionals/hpSchema");
const { vcModel } = require("../../VaccinationCenters/vcSchema");
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

    // todo=> use all models for check mail already taken or not

    const existingParent = await ParentModel.findOne({ email });

    const existingHP = await HPModel.findOne({ email });
    const existingVC = await vcModel.findOne({ email });

    if (existingParent || existingHP ||existingVC) {
      return res.status(400).json({ message: "Email already in use" });
    }
    next();
  } catch (error) {
    console.error("Error in email validation middleware: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { validateEmailForRegistration };
