const multer = require("multer");
const parents = require("../Parent/parentSchema");
const kids = require("./kidSchema");

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, "./upload");
    },
    filename: function (req, file, cb) {
      const uniquePrefix = 'prefix-'; // Add your desired prefix here
      const originalname = file.originalname;
      const extension = originalname.split('.').pop();
      const filename = uniquePrefix + originalname.substring(0, originalname.lastIndexOf('.')) + '-' + Date.now() + '.' + extension;
      cb(null, filename);
    },
  });
  const upload = multer({ storage: storage }).single("image");

const addKid = async (req, res) => {

  const newKid = await new kids({
    name:req.body.name,
    dob:req.body.dob,
    birthWeight:req.body.birthWeight,
    weight:req.body.weight,
    height:req.body.height,
    parentId:req.body.parentId,
    bloodGroup:req.body.bloodGroup,
    image:req.file

  });

  newKid
    .save()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Inserted successfully",
        data: data
      });
    })
    .catch((err) => {
      
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};
// insertion -- finished



//View all Users

const viewKids = (req, res) => {
    kids
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
  const editKidById = (req, res) => {
    parents
      .findByIdAndUpdate(
        { _id: req.params.id },
        {
            name:req.body.name,
            dob:req.body.dob,
            birthWeight:req.body.birthWeight,
            weight:req.body.weight,
            height:req.body.height,
            parentId:req.body.parentId,
            bloodGroup:req.body.bloodGroup,
            image:req.file
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
  const viewKidById = (req, res) => {
    kids
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
// view  by id
const viewKidsByParentId = (req, res) => {
  kids
    .find({ parentId: req.params.id })
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
  module.exports={
    addKid,
    viewKidById,
    editKidById,
    viewKids,
    upload,
    viewKidsByParentId
  }