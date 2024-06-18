const { AshaWorkerModel } = require("./AshaWorkerSchema");
const multer = require("multer");
const { isValidObjectId } = require("mongoose");
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

const registerAshaWorker = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      address,
      dateOfBirth,
      gender,
      experience,
      qualifications,
    } = req.body;
    if (
      !name ||
      !email ||
      !password ||
      !phoneNumber ||
      !address ||
      !qualifications ||
      !dateOfBirth ||
      !gender ||
      !experience
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (gender !== "male" && gender !== "female" && gender !== "other") {
      return res
        .status(400)
        .json({ message: "Gender must be male, female or other" });
    }
    const hashedPassword = await encryptPassword(password);

    const newAshaWorker = new AshaWorkerModel({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      qualifications,
      dateOfBirth,
      gender,
      experience,
      profilePicture: req.file?.path ? req.file : null,
    });
    
    await newAshaWorker.save();
    return res.status(201).json({
      status: 201,
      message: "Asha Worker Registration completed successfully.",
      data: newAshaWorker,
    });
  } catch (error) {
    console.error("Error in email Asha Worker registration: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const loginAshaWorker = async (req, res) => {
  try {
    const { email, password } = req.body;
    const ashaWorker = await AshaWorkerModel.findOne({ email });
    if (!ashaWorker) {
      return res.status(404).json({
        message: "User not found. Please check your email and password",
      });
    }
    const isPasswordMatch = await comparePasswords(
      password,
      ashaWorker.password
    );
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "Please check your email and password" });
    }

    if (ashaWorker.isAdminApproved === "pending") {
      return res
        .status(403)
        .json({ message: "Please wait for admin approval" });
    }

    if (ashaWorker.isAdminApproved === "rejected") {
      return res
        .status(403)
        .json({ message: "Your account has been rejected by admin" });
    }

    const ashWorkerCopy = ashaWorker.toObject();
    delete ashWorkerCopy.password;
    const token = generateToken(ashWorkerCopy);

    return res.status(200).json({
      message: "Login successfull",
      data: ashWorkerCopy,
      token,
    });
  } catch (error) {
    console.error("Error logging in ashaWorker:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const adminApprovedAshaWorkerRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const ashaWorker = await AshaWorkerModel.findById(id);

    if (!ashaWorker) {
      return res.status(404).json({
        message: "Asha Worker not found",
      });
    }

    ashaWorker.isAdminApproved = "approved";

    await ashaWorker.save();

    return res.status(200).json({
      message: "Asha Worker approved successfully",
      data: ashaWorker,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const adminRejectedAshaWorkerRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const ashaWorker = await AshaWorkerModel.findById(id);
    if (!ashaWorker) {
      return res.status(404).json({
        message: "Asha Worker not found",
      });
    }

    ashaWorker.isAdminApproved = "rejected";
    await ashaWorker.save();
    return res.status(200).json({
      message: "Asha Worker rejected successfully",
      data: ashaWorker,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const getAllPendingAshaWorker = async (req, res) => {
  try {
    const allPendingAshaWorkers = await AshaWorkerModel.find({
      isAdminApproved: "pending",
    });
    return res.status(200).json({
      message: "All pending Asha Workers",
      data: allPendingAshaWorkers,
    });
  } catch (error) {
    console.error("Error getting all pending Asha Worker:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
const getAllApprovedAshaWorker = async (req, res) => {
  try {
    const allApprovedAshaWorker = await AshaWorkerModel.find({
      isAdminApproved: "approved",
    });
    return res.status(200).json({
      message: "All approved Asha Workers.",
      data: allApprovedAshaWorker,
    });
  } catch (error) {
    console.error("Error getting all approved Asha Worker:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const getAllRejectedAshaWorker = async (req, res) => {
  try {
    const allRejectedAshaWorker = await AshaWorkerModel.find({
      isAdminApproved: "rejected",
    });
    return res.status(200).json({
      message: "All rejected Asha Workers.",
      data: allRejectedAshaWorker,
    });
  } catch (error) {
    console.error("Error getting all rejected Asha Worker:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
const getAshaWorkerDataById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Id is not valid" });
    }

    const ashaWorker = await AshaWorkerModel.findById(id);
    if (!ashaWorker) {
      return res.status(404).json({ message: "Asha Worker not found" });
    }
    return res
      .status(200)
      .json({ message: "Asha Worker data", data: ashaWorker });
  } catch (error) {
    console.error("Error getting ashaWorker data by id:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const resetAshaWorkerPasswordByEmail = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ message: "Email and  password are required." });
    }

    let existingAshaWorker = await AshaWorkerModel.findOne({ email });
    if (!existingAshaWorker) {
      return res.status(404).json({ message: "Email id is not valid." });
    }

    if (oldPassword) {
      const isOldPasswordMatch = await comparePasswords(
        oldPassword,
        existingAshaWorker.password
      );

      if (!isOldPasswordMatch) {
        return res.status(400).json({ message: "Old password is incorrect." });
      }
    }

    const hashedPassword = await encryptPassword(newPassword);
    const AshaWorkerWithNewPassword = await AshaWorkerModel.findByIdAndUpdate(
      existingAshaWorker._id,
      { password: hashedPassword },
      { new: true }
    );

    return res.status(200).json({
      message: "Password updated successfully.",
      data: AshaWorkerWithNewPassword,
    });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const updateAshaWorkerById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Id is not valid" });
    }

    const ashaWorker = await AshaWorkerModel.findById(id);

    if (!ashaWorker) {
      return res.status(404).json({ message: "Asha Worker not found" });
    }
    const { name, email, phoneNumber, address, qualification } = req.body;

    let newValues = {};
    if (name) {
      newValues.name = name;
    }
    if (email) {
      newValues.email = email;
    }
    if (phoneNumber) {
      newValues.phoneNumber = phoneNumber;
    }
    if (address) {
      newValues.address = address;
    }
    if (qualification) {
      newValues.qualification = qualification;
    }

    if (req.file?.path) {
      newValues.profilePicture = req.file;
    }

    const updatedAshaWorker = await AshaWorkerModel.findByIdAndUpdate(
      id,
      newValues,
      {
        new: true,
      }
    );

    if (updatedAshaWorker) {
      return res.status(200).json({
        message: "Asha Worker updated successfully",
        data: updatedAshaWorker,
      });
    } else {
      throw new Error("Failed to update Asha Worker");
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  upload,
  registerAshaWorker,
  loginAshaWorker,
  adminApprovedAshaWorkerRequest,
  adminRejectedAshaWorkerRequest,
  getAllPendingAshaWorker,
  getAllApprovedAshaWorker,
  getAllRejectedAshaWorker,
  getAshaWorkerDataById,
  resetAshaWorkerPasswordByEmail,
  updateAshaWorkerById,
};
