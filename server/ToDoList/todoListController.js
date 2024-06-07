const { TodoModel } = require("./todoListSchema");
const { ParentModel } = require("../Parent/parentSchema");
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

const getTodoItemsByParentId = async (req, res) => {
  try {
    const { parentId } = req.params;
    const parent = await ParentModel.findById(parentId);
    if (!parent) {
      return res
        .status(404)
        .json({ message: "Parent not found, id is invalid" });
    }
    const todos = await TodoModel.find({ parentId });
    return res.status(200).json({ message: "All todo items", data: todos });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  addToDo,
  viewActivityById,
  getTodoItemsByParentId,
  deleteToDOById,
};
