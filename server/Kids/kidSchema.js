const mongoose = require("mongoose");

const schema = mongoose.Schema(
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
      ref: "parents",
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("kids", schema);
