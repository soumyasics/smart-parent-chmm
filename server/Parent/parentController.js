const { ParentModel } = require("./parentModel");

const registerParent = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, address } = req.body;
    if (!name || !email || !password || !phoneNumber || !address) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newParent = new ParentModel({
      name,
      email,
      password,
      phoneNumber,
      address,
    });

    await newParent.save();
    return res.status(200).json({
      status: 200,
      message: "Parent Registration completed successfully.",
      data: newParent,
    });
  } catch (error) {
    console.error("Error in email parent registration: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
// Registration -- finished

//Login
const loginParent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const parent = await ParentModel.findOne({ email });
    if (!parent) {
      return res
        .status(404)
        .json({
          message: "User not found. Please check your email id and password",
        });
    }
    
  } catch (err) {
    console.error("Error logging in parent:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//View all Users

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
      contact: req.body.contact,
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
//forgotvPawd  by id
const forgotPwd = (req, res) => {
  ParentModel.findOneAndUpdate(
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
  registerParent,
  viewParentById,
  viewParents,
  editParentById,
  forgotPwd,
  deleteParentById,
  loginParent,
};
