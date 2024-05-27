const { hpModel } = require("./hpSchema");
const multer = require("multer");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadProfilePic = multer({ storage: storage }).single("profilePicture");
const uploadCertificate = multer({ storage: storage }).single("certificateImg");

const {
  encryptPassword,
  comparePasswords,
} = require("../utils/passwordEncryption");

const { generateToken } = require("../utils/auth");

const registerHP = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, category } = req.body;
    if (!name || !email || !password || !phoneNumber || !category) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const hashedPassword = await encryptPassword(password);
    const newHP = new hpModel({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      category,
      certificate: req.files[0]?.path ? req.files[0] : null,
      profilePicture: req.files[1]?.path ? req.files[1] : null,
    });

    await newHP.save();
    return res.status(200).json({
      status: 200,
      message: "Health Professional Registration completed successfully.",
      data: newHP,
    });
  } catch (error) {
    console.error("Error in email Health Professional registration: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const loginHP = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hp = await hpModel.findOne({ email });
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

    const parentCopy = parent.toObject();
    delete parentCopy.password;

    const token = generateToken(parentCopy);

    return res.status(200).json({
      message: "Parent login successfull",
      data: parentCopy,
      token,
    });
  } catch (error) {
    console.error("Error logging in hp:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const viewHps = (req, res) => {
  hpModel
    .find()
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
const editHPById = (req, res) => {
  hpModel
    .findByIdAndUpdate(
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
  hpModel
    .findById({ _id: req.params.id })
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
  hpModel
    .findByIdAndDelete({ _id: req.params.id })
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
  hpModel
    .findOneAndUpdate(
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
  viewHpById,
  viewHps,
  editHPById,
  forgotPwd,
  deleteHpById,
  loginHP,
  uploadCertificate,
  uploadProfilePic,
};
