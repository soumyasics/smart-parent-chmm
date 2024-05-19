const { ParentModel } = require("../../Parent/parentModel");

export const validateEmailForRegistration = async (req, res, next) => {
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
    if (existingParent) {
      return res.status(400).json({ message: "Email already in use" });
    }

    next();
  } catch (error) {
    console.error("Error in email validation middleware: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
