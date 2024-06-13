const { ParentModel } = require("./parentSchema");
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

const registerParent = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      address,
      dateOfBirth,
      parentalStatus,
    } = req.body;
    if (
      !name ||
      !email ||
      !password ||
      !phoneNumber ||
      !address ||
      !dateOfBirth ||
      !parentalStatus
    ) {
      return res.status(400).json({
        message: "All fields are required.",
        existingFields: req.body,
      });
    }
    //todo=> will use this hashsed password after development works completed
    const hashedPassword = await encryptPassword(password);
    const newParent = new ParentModel({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      dateOfBirth,
      parentalStatus,
      profilePicture: req.file?.path ? req.file : null,
    });

    await newParent.save();
    return res.status(201).json({
      status: 201,
      message: "Parent registration completed successfully.",
      data: newParent,
    });
  } catch (error) {
    console.error("Error in email parent registration: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};
const loginParent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const parent = await ParentModel.findOne({ email });
    if (!parent) {
      return res.status(404).json({
        message: "User not found. Please check your email and password",
      });
    }

    // todo=> this will un comment for checking encypted passwords
    const isPasswordMatch = await comparePasswords(password, parent.password);

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "Please check your email and password" });
    }

    const parentCopy = parent.toObject();
    delete parentCopy.password;

    const token = generateToken(parentCopy);

    return res.status(200).json({
      message: "Parent login successfull",
      data: parentCopy,
      token,
    });
  } catch (error) {
    console.error("Error logging in parent:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const resetParentPasswordByEmail = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ message: "Email and new password is required." });
    }

    let existingParent = await ParentModel.findOne({ email });
    if (!existingParent) {
      return res.status(404).json({ message: "Email id is not valid." });
    }

    if (oldPassword) {
      const isOldPasswordMatch = await comparePasswords(
        oldPassword,
        existingParent.password
      );

      if (!isOldPasswordMatch) {
        return res.status(400).json({ message: "Old password is incorrect." });
      }
    }

    const hashedPassword = await encryptPassword(newPassword);
    const parentWithNewPassword = await ParentModel.findByIdAndUpdate(
      existingParent._id,
      { password: hashedPassword },
      { new: true }
    );

    return res.status(200).json({
      message: "Password updated successfully.",
      data: parentWithNewPassword,
    });
  } catch (error) {
    console.error("Error on updating password:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const getParentDataById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Id is not valid" });
    }

    const parent = await ParentModel.findById(id);
    return res.status(200).json({ message: "Parent data ", data: parent });
  } catch (error) {
    console.log("Error on get parent data by id", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const getParentDataWithToken = (req, res) => {
  try {
    return res.json({ message: "Parent data ", data: req.user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const updateParentById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Id is not valid" });
    }

    const parent = await ParentModel.findById(id);

    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }
    const { name, email, phoneNumber, address } = req.body;

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
    if (req.file?.path) {
      newValues.profilePicture = req.file;
    }

    const updatedParent = await ParentModel.findByIdAndUpdate(id, newValues, {
      new: true,
    });

    if (updatedParent) {
      return res.status(200).json({
        message: "Parent updated successfully",
        data: updatedParent,
      });
    } else {
      throw new Error("Failed to update parent");
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const viewAllParents = async (req, res) => {
  try {
    const parents = await ParentModel.find();
    return res.status(200).json({ message: "Parent data ", data: parents });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
const viewParents = (req, res) => {
  ParentModel.find()
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

// view  finished

//update  by id
const editParentById = (req, res) => {
  ParentModel.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      parentalStatus: req.body.parentalStatus,
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
const viewParentById = (req, res) => {
  ParentModel.findById({ _id: req.params.id })
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

const deleteParentById = (req, res) => {
  ParentModel.findByIdAndDelete({ _id: req.params.id })
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

module.exports = {
  registerParent,
  getParentDataById,
  updateParentById,
  viewParentById,
  viewAllParents,
  viewParents,
  editParentById,
  resetParentPasswordByEmail,
  deleteParentById,
  loginParent,
  getParentDataWithToken,
  upload,
};
