const parents = require("./parentSchema");


const registerParent = async (req, res) => {

  const newParent = await new parents({
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    password: req.body.password,
    parentalStatus:req.body.parentalStatus
    
  });

  newParent
    .save()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Inserted successfully",
        data: data
      });
    })
    .catch((err) => {
      if (err.code == 1100) {
        return res.json({
          status: 409,
          msg: "Mail Id already in Use",
          Error: err,
        });
      }
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};
// Registration -- finished

//Login
const loginParent = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  parents
    .findOne({ email: email })
    .exec()
    .then((data) => {
        if(data!=null){
      if (password == data.password) {
        res.json({
          status: 200,
          msg: "Login successfully",
          data: data,
        });
      } else {
        res.json({
          status: 405,
          msg: "password Mismatch",
        });
      }
    }else{
        res.json({
            status: 405,
            msg: "User Not Found",
          });
    }
    })
    .catch((err) => {
      res.json({
        status: 405,
        msg: "User not found",
        Error: err,
      });
    });
};

//Login User --finished

//View all Users

const viewParents = (req, res) => {
  parents
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
const editParentById = (req, res) => {
  parents
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        parentalStatus:req.body.parentalStatus
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
  parents
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

const deleteParentById = (req, res) => {
  parents
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
  parents
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



module.exports={
registerParent,
viewParentById,
viewParents,
editParentById,
forgotPwd,
deleteParentById,
loginParent
}