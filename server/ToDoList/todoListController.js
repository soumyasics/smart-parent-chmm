const { todo } = require("./todoListSchema");

const addToDo = async (req, res) => {
  const newParent = new ParentModel({
    activityName: req.body.activityName,
    activityDate: req.body.activityDate,
    activityTimeHrs: req.body.activityTimeHrs,
    activityTimeMins: req.body.activityTimeMins,
  });

  await newParent
    .save()
    .then((data) => {
      return res.status(201).json({
        status: 201,
        message: "Parent registration completed successfully.",
        data: data,
      });
    })
    .catch((error) => {
      console.error("Error in email parent registration: ", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error });
    });
};
//view by id
const viewActivityById = (req, res) => {
  todo
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

const deleteToDOById = (req, res) => {
  todo
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

module.exports = {
  addToDo,
  viewActivityById,
  deleteToDOById,
};
