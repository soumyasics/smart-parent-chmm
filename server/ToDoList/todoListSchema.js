const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
    {
        activityName: {
            type: String,
            required: trusted,
        },
        activityDate: {
            type: Date,
            required: true
        },
        activityTimeHrs: {
            type: Number,
            required: true
        },
        activityTimeMins: {
            type: Number,
            required: true
        },
        status: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);
const todoModel = mongoose.model("todos", todoSchema);
module.exports = { todoModel };
