const { VCModel } = require("./vcSchema");
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

const districts = [
  "Trivandrum",
  "Kollam",
  "Alappuzha",
  "Pathanamthitta",
  "Kottayam",
  "Idukki",
  "Ernakulam",
  "Thrissur",
  "Palakkad",
  "Malappuram",
  "Kozhikode",
  "Wayanad",
  "Kannur",
  "Kasaragod",
];
const registerVC = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, address, category, district } =
      req.body;
    if (
      !name ||
      !email ||
      !password ||
      !phoneNumber ||
      !address ||
      !category ||
      !district
    ) {
      return res.status(400).json({
        message: "All fields are required.",
        existingFields: req.body,
      });
    }
    if (category !== "hospital" && category !== "anganvadi") {
      return res.status(400).json({
        message: "Invalid category",
      });
    }
    const isValidDistrict = districts.find((d) => d === district);

    if (!isValidDistrict) {
      return res.status(400).json({
        message: "District is not valid",
      });
    }

    const hashedPassword = await encryptPassword(password);
    const newVC = new VCModel({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      district,
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
    const vc = await VCModel.findOne({ email });
    if (!vc) {
      return res.status(404).json({
        message: "Vaccination center not found",
      });
    }

    const isPasswordMatch = await comparePasswords(
      password,
      vc?.password || ""
    );
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Please check your password" });
    }

    if (vc.isAdminApproved === "pending") {
      return res
        .status(400)
        .json({ message: "Your registration request is not approved yet!" });
    }

    if (vc.isAdminApproved === "rejected") {
      return res.status(400).json({
        message: "Your registration request has been rejected!",
      });
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

const approveVCById = async (req, res) => {
  try {
    const id = req.params.id;
    const vc = await VCModel.findById(id);

    if (!vc) {
      return res.status(404).json({ message: "Vaccination center not found." });
    }

    const approvedVc = await VCModel.findByIdAndUpdate(
      id,
      { isAdminApproved: "approved" },
      { new: true }
    );
    return res.status(200).json({
      message: "Vaccination center registration approved.",
      data: approvedVc,
    });
  } catch (error) {
    console.error("Error approving vaccination center:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const rejectVCById = async (req, res) => {
  try {
    const id = req.params.id;
    const vc = await VCModel.findById(id);

    if (!vc) {
      return res.status(404).json({ message: "Vaccination center not found." });
    }

    const approvedVc = await VCModel.findByIdAndUpdate(
      id,
      { isAdminApproved: "rejected" },
      { new: true }
    );
    return res.status(200).json({
      message: "Vaccination center registration rejected.",
      data: approvedVc,
    });
  } catch (error) {
    console.error("Error approving vaccination center:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const allPendingVC = async (req, res) => {
  try {
    const allPendingVCs = await VCModel.find({ isAdminApproved: "pending" });
    return res.status(200).json({
      message: "All pending vaccination centers",
      data: allPendingVCs,
    });
  } catch (error) {
    console.error("Error getting all pending vaccination center:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
const allApprovedVC = async (req, res) => {
  try {
    const allApprovedVc = await VCModel.find({
      isAdminApproved: "approved",
    }).populate("vaccines");
    return res.status(200).json({
      message: "All approved vaccination centers",
      data: allApprovedVc,
    });
  } catch (error) {
    console.error("Error getting all approved vaccination center:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const allRejectedVC = async (req, res) => {
  try {
    const allRejectedVc = await VCModel.find({ isAdminApproved: "rejected" });
    return res.status(200).json({
      message: "All rjected vaccination centers.",
      data: allRejectedVc,
    });
  } catch (error) {
    console.error("Error getting all rejected vaccination center:", error);
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

    let existingVC = await VCModel.findOne({ email });
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
    const vcWithNewPassword = await VCModel.findByIdAndUpdate(
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

    const vc = await VCModel.findById(id).populate("vaccines").exec();
    return res
      .status(200)
      .json({ message: "Vaccination center data", data: vc });
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

    const vc = await VCModel.findById(id);

    if (!vc) {
      return res.status(404).json({ message: "Vaccination center not found" });
    }
    const { name, email, phoneNumber, address, category } = req.body;

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
    if (category) {
      if (category !== "hospital" && category !== "anganvadi") {
        return res.status(400).json({
          message: "Invalid category",
        });
      }
      newValues.category = category;
    }
    if (req.file?.path) {
      newValues.profilePicture = req.file;
    }

    const updatedVC = await VCModel.findByIdAndUpdate(id, newValues, {
      new: true,
    });

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
  VCModel.find()
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
  VCModel.findById({ _id: req.params.id })
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
  VCModel.findByIdAndDelete({ _id: req.params.id })
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
  approveVCById,
  rejectVCById,
  allPendingVC,
  allApprovedVC,
  allRejectedVC,
  resetVCPasswordByEmail,
  getVCDataById,
  getVCDataWithToken,
  updateVCById,
  viewVCs,
  viewVCById,
  deleteVCById,
  upload,
};
