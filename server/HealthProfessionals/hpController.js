const { HPModel } = require("./hpSchema");
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

const upload = multer({ storage: storage }).any();

const uploadProfilePicture = multer({ storage: storage }).single(
  "profilePicture"
);

const {
  encryptPassword,
  comparePasswords,
} = require("../utils/passwordEncryption");

const { generateToken } = require("../utils/auth");

const registerHP = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      department,
      address,
      qualification,
      category,
      appointmentFee,
    } = req.body;
    if (
      !name ||
      !email ||
      !password ||
      !phoneNumber ||
      !department ||
      !qualification ||
      !address ||
      !category ||
      !appointmentFee
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const hashedPassword = await encryptPassword(password);

    if (
      category !== "Dietitian" &&
      category !== "Psychiatrist" &&
      category !== "Physician" &&
      category !== "Fitness Specialist"
    ) {
      return res.status(400).json({
        message:
          "Category must be Dietitian, Psychiatrist, Physician or Fitness Specialist",
      });
    }

    const certificateFile = req.files.find((file) => {
      return file.fieldname === "certificateImg";
    });

    const profilePictureFile = req.files.find((file) => {
      return file.fieldname === "profilePicture";
    });

    let convertFeeIntoNumber = Number(appointmentFee);
    const newHP = new HPModel({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      department,
      qualification,
      category,
      appointmentFee: convertFeeIntoNumber,
      profilePicture: profilePictureFile,
      certificateImg: certificateFile,
    });

    await newHP.save();
    return res.status(201).json({
      status: 201,
      message: "Health Professional Registration completed successfully.",
      data: newHP,
    });
  } catch (error) {
    console.error("Error in email Health Professional registration: ", error);
    return res.status(500).json({ message: error.message });
  }
};
const loginHP = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hp = await HPModel.findOne({ email });
    if (!hp) {
      return res.status(404).json({
        message: "User not found. Please check your email and password",
      });
    }
    const isPasswordMatch = await comparePasswords(password, hp.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "Please check your email and password" });
    }

    if (hp.isAdminApproved === "pending") {
      return res
        .status(403)
        .json({ message: "Please wait for admin approval" });
    }

    if (hp.isAdminApproved === "rejected") {
      return res
        .status(403)
        .json({ message: "Your account has been rejected by admin" });
    }

    if (hp.isActive === "suspended") {
      return res
        .status(403)
        .json({ message: "Your account has been suspended" });
    }

    const hpCopy = hp.toObject();
    delete hpCopy.password;
    const token = generateToken(hpCopy);

    return res.status(200).json({
      message: "Login successfull",
      data: hpCopy,
      token,
    });
  } catch (error) {
    console.error("Error logging in hp:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const adminApprovedHPRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const hp = await HPModel.findById(id);

    if (!hp) {
      return res.status(404).json({
        message: "Health Professional not found",
      });
    }

    hp.isAdminApproved = "approved";

    await hp.save();

    return res.status(200).json({
      message: "Health Professional approved successfully",
      data: hp,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const adminRejectedHPRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const hp = await HPModel.findById(id);
    if (!hp) {
      return res.status(404).json({
        message: "Health Professional not found",
      });
    }

    hp.isAdminApproved = "rejected";
    await hp.save();
    return res.status(200).json({
      message: "Health Professional rejected successfully",
      data: hp,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const getAllPendingHP = async (req, res) => {
  try {
    const allPendingHPs = await HPModel.find({ isAdminApproved: "pending" });
    return res.status(200).json({
      message: "All pending health professionals",
      data: allPendingHPs,
    });
  } catch (error) {
    console.error("Error getting all pending health professional:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
const getAllApprovedHP = async (req, res) => {
  try {
    const allApprovedHP = await HPModel.find({ isAdminApproved: "approved" });
    return res.status(200).json({
      message: "All approved health professionals.",
      data: allApprovedHP,
    });
  } catch (error) {
    console.error("Error getting all approved health professional:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const getAllRejectedHP = async (req, res) => {
  try {
    const allRejectedHP = await HPModel.find({ isAdminApproved: "rejected" });
    return res.status(200).json({
      message: "All rejected health professionals.",
      data: allRejectedHP,
    });
  } catch (error) {
    console.error("Error getting all rejected health professional:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
const getHPDataById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Id is not valid" });
    }

    const hp = await HPModel.findById(id);
    return res
      .status(200)
      .json({ message: "Health professional center data", data: hp });
  } catch (error) {
    console.error("Error getting hp data by id:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const resetHPPasswordByEmail = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ message: "Email and  password are required." });
    }

    let existingHP = await HPModel.findOne({ email });
    if (!existingHP) {
      return res.status(404).json({ message: "Email id is not valid." });
    }

    if (oldPassword) {
      const isOldPasswordMatch = await comparePasswords(
        oldPassword,
        existingHP.password
      );

      if (!isOldPasswordMatch) {
        return res.status(400).json({ message: "Old password is incorrect." });
      }
    }

    const hashedPassword = await encryptPassword(newPassword);
    const HPWithNewPassword = await HPModel.findByIdAndUpdate(
      existingHP._id,
      { password: hashedPassword },
      { new: true }
    );

    return res.status(200).json({
      message: "Password updated successfully.",
      data: HPWithNewPassword,
    });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const makeHPDeactivate = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Id is not valid" });
    }

    const hp = await HPModel.findById(id);
    if (!hp) {
      return res.status(404).json({ message: "Health professional not found" });
    }

    const deactivatedHP = await HPModel.findByIdAndUpdate(
      id,
      { isActive: "suspended" },
      { new: true } // Return the updated document
    );

    if (deactivatedHP) {
      return res.status(200).json({
        message: "Health professional deactivated successfully",
        data: deactivatedHP,
      });
    } else {
      throw new Error("Failed to deactivate health professional");
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const makeHPActivate = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Id is not valid" });
    }

    const hp = await HPModel.findById(id);
    if (!hp) {
      return res.status(404).json({ message: "Health professional not found" });
    }

    const deactivatedHP = await HPModel.findByIdAndUpdate(
      id,
      { isActive: "active" },
      { new: true } // Return the updated document
    );

    if (deactivatedHP) {
      return res.status(200).json({
        message: "Health professional activated successfully",
        data: deactivatedHP,
      });
    } else {
      throw new Error("Failed to activate health professional");
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};


const updateHPById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Id is not valid" });
    }

    const hp = await HPModel.findById(id);

    if (!hp) {
      return res.status(404).json({ message: "Health professional not found" });
    }
    const { name, email, phoneNumber, address, qualification, department } =
      req.body;

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
    if (department) {
      newValues.department = department;
    }

    if (req.file?.path) {
      newValues.profilePicture = req.file;
    }

    const updatedHP = await HPModel.findByIdAndUpdate(id, newValues, {
      new: true,
    });

    if (updatedHP) {
      return res.status(200).json({
        message: "Health professional updated successfully",
        data: updatedHP,
      });
    } else {
      throw new Error("Failed to update health professional");
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const getHPsAllSubscribers = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Id is not valid" });
    }
    const hp = await HPModel.findById(id);
    if (!hp) {
      return res.status(404).json({ message: "Health professional not found" });
    }

    const allHPSubscribers = await HPModel.findById(id)
      .populate("subscribers")
      .exec();

    if (!allHPSubscribers) {
      return res.status(404).json({ message: "Health professional not found" });
    }

    let subscribers = [];
    if (
      allHPSubscribers.subscribers &&
      allHPSubscribers.subscribers?.length > 0
    ) {
      subscribers = allHPSubscribers.subscribers;
    }
    // Use a Set to remove duplicates
    const uniqueSubscriberss = Array.from(
      new Set(subscribers.map((subscribers) => subscribers._id.toString()))
    ).map((id) =>
      subscribers.find((subscribers) => subscribers._id.toString() === id)
    );

    return res.status(200).json({
      message: "Health professional all subscribers.",
      data: uniqueSubscriberss,
    });
  } catch (error) {
    console.error("Error getting all health professional subscribers:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const viewHps = (req, res) => {
  HPModel.find()
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained ",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

const editHPById = (req, res) => {
  HPModel.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    }
  )
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Updated successfully",
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });
};
// view  by id
const viewHpById = (req, res) => {
  HPModel.findById({ _id: req.params.id })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

const deleteHpById = (req, res) => {
  HPModel.findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data removed successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};
//forgotvPawd  by id
const forgotPwd = (req, res) => {
  HPModel.findOneAndUpdate(
    { email: req.body.email },
    {
      password: req.body.password,
    }
  )
    .exec()
    .then((data) => {
      if (data != null)
        res.json({
          status: 200,
          msg: "Updated successfully",
        });
      else
        res.json({
          status: 500,
          msg: "User Not Found",
        });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });
};

module.exports = {
  registerHP,
  loginHP,
  adminApprovedHPRequest,
  adminRejectedHPRequest,
  getAllPendingHP,
  getAllApprovedHP,
  getAllRejectedHP,
  resetHPPasswordByEmail,
  updateHPById,
  getHPDataById,
  viewHpById,
  viewHps,
  editHPById,
  forgotPwd,
  deleteHpById,
  upload,
  uploadProfilePicture,
  getHPsAllSubscribers,
  makeHPActivate,
  makeHPDeactivate
};
