const  {vcModel}  = require("./vcSchema");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("profilePicture");

const {
  encryptPassword,
  comparePasswords,
} = require("../utils/passwordEncryption");

const { generateToken } = require("../utils/auth");
const { isValidObjectId } = require("mongoose");

const registerVC = async (req, res) => {
  try {
    const { name, email, password, contact, location, category } = req.body;
    if (!name || !email || !password || !contact || !location || !category) {
      return res.status(400).json({
        message: "All fields are required.",
        existingFields: req.body,
      });
    }

    const hashedPassword = await encryptPassword(password);
    const newVC = new vcModel({
      name,
      email,
      password: hashedPassword,
      contact,
      location,
      category,
      profilePicture: req.file?.path ? req.file : null,
    });

    await newVC.save();
    return res.status(201).json({
      status: 201,
      message: "Vaccination center registration completed successfully.",
      data: newVC,
    });
  } catch (error) {
    console.error("Error in vaccination center registration: ", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const loginVC = async (req, res) => {
  try {
    const { email, password } = req.body;
    const vc = await vcModel.findOne({ email });
    if (!vc) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordMatch = await comparePasswords(password, vc.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "Please check your password" });
    }

    const vcCopy = vc.toObject();
    delete vcCopy.password;

    const token = generateToken(vcCopy);

    return res.status(200).json({
      message: "Vaccination center login successful",
      data: vcCopy,
      token,
    });
  } catch (error) {
    console.error("Error logging in vaccination center:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const resetVCPasswordByEmail = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ message: "Email and  password are required." });
    }

    let existingVC = await vcModel.findOne({ email });
    if (!existingVC) {
      return res.status(404).json({ message: "Email id is not valid." });
    }

    if (oldPassword) {
      const isOldPasswordMatch = await comparePasswords(
        oldPassword,
        existingVC.password
      );

      if (!isOldPasswordMatch) {
        return res.status(400).json({ message: "Old password is incorrect." });
      }
    }

    const hashedPassword = await encryptPassword(newPassword);
    const vcWithNewPassword = await vcModel.findByIdAndUpdate(
      existingVC._id,
      { password: hashedPassword },
      { new: true }
    );

    return res.status(200).json({
      message: "Password updated successfully.",
      data: vcWithNewPassword,
    });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const getVCDataById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Id is not valid" });
    }

    const vc = await vcModel.findById(id);
    return res.status(200).json({ message: "Vaccination center data", data: vc });
  } catch (error) {
    console.error("Error getting vaccination center data by id:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const getVCDataWithToken = (req, res) => {
  try {
    return res.json({ message: "Vaccination center data", data: req.user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const updateVCById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Id is not valid" });
    }

    const vc = await vcModel.findById(id);

    if (!vc) {
      return res.status(404).json({ message: "Vaccination center not found" });
    }

    const { name, email, contact, location, category } = req.body;

    const updatedVC = await vcModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        contact,
        location,
        category,
        profilePicture: req.file?.path ? req.file : null,
      },
      { new: true }
    );

    if (updatedVC) {
      return res.status(200).json({
        message: "Vaccination center updated successfully",
        data: updatedVC,
      });
    } else {
      throw new Error("Failed to update vaccination center");
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const viewVCs = (req, res) => {
  vcModel.find()
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          message: "Data obtained successfully",
          data: data,
        });
      } else {
        res.json({
          status: 200,
          message: "No data obtained",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        message: "Data not obtained",
        error: err,
      });
    });
};

const viewVCById = (req, res) => {
  vcModel.findById({ _id: req.params.id })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        message: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        message: "No data obtained",
        error: err,
      });
    });
};

const deleteVCById = (req, res) => {
  vcModel.findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        message: "Data removed successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        message: "No data obtained",
        error: err,
      });
    });
};

module.exports = {
  registerVC,
  loginVC,
  resetVCPasswordByEmail,
  getVCDataById,
  getVCDataWithToken,
  updateVCById,
  viewVCs,
  viewVCById,
  deleteVCById,
  upload,
};
