const mongoose = require("mongoose");

const kidSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    birthWeight: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Parent",
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      default: null
    },
  },
  { timestamps: true }
);
const KidModel = mongoose.model("Kids", kidSchema);
module.exports = {KidModel}
