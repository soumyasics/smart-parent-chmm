const { TodoModel } = require("./todoListSchema");

const addToDo = async (req, res) => {
  try {
    const {
      parentId,
      activityName,
      activityDate,
      activityTimeHrs,
      activityTimeMins,
    } = req.body;


    if (
      !parentId ||
      !activityDate ||
      !activityName ||
      !activityTimeHrs ||
      !activityTimeMins
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTodo = new TodoModel({
      parentId,
      activityName,
      activityDate,
      activityTimeHrs,
      activityTimeMins,
    });

    await newTodo.save();
    return res.status(201).json({
      status: 201,
      message: "Todo item added  successfully.",
      data: newTodo,
    });
  } catch (error) {
    console.error("Error on adding todo : ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};
//view by id
const viewActivityById = (req, res) => {
  TodoModel.findById({ _id: req.params.id })
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
  TodoModel.findByIdAndDelete({ _id: req.params.id })
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
