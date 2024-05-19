const validatePassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    const minLen = 8;

    if (password.length < minLen) {
      return res.status(400).json({
        message: `Password must be at least ${minLen} characters long`,
      });
    }
    next();
  } catch (error) {
    console.error("Error in password validation middleware: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { validatePassword };
