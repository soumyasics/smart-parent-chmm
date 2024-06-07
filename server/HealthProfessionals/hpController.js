const { HPModel } = require("./hpSchema");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).any();

// const uploadProfilePic = multer({ storage: storage }).single("profilePicture");
// const uploadCertificate = multer({ storage: storage }).single("certificateImg");

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

    const certificateFile = req.files.find((file) => {
      return file.fieldname === "certificateImg";
    });

    const profilePictureFile = req.files.find((file) => {
      return file.fieldname === "profilePicture";
    });
    const newHP = new HPModel({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      category,
      certificateImg: certificateFile,
      profilePicture: profilePictureFile,
    });

    await newHP.save();
    return res.status(201).json({
      status: 201,
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

    const hpCopy = hp.toObject();
    delete hpCopy.password;
    console.log("hpp", hpCopy);
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

// view  finished

//update  by id
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
  viewHpById,
  viewHps,
  editHPById,
  forgotPwd,
  deleteHpById,
  upload,
};
