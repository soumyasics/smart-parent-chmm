const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    activityName: {
      type: String,
      required: true,
    },
    parentId: {
      ref: "parents",
      type: mongoose.Types.ObjectId,
      required: true
    },
    activityDate: {
      type: Date,
      required: true,
    },
    activityTimeHrs: {
      type: Number,
      required: true,
    },
    activityTimeMins: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const TodoModel = mongoose.model("todos", todoSchema);
module.exports = { TodoModel };
