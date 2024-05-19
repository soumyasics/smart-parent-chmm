const validateEmailForLogin = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    next();
  } catch (error) {
    console.error("Error in login email validation middleware: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { validateEmailForLogin };
