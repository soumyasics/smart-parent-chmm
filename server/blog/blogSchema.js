const mongoose = require("mongoose");
const blogSchema = mongoose.Schema(
  {
    para1: {
      type: String,
      required: true,
    },
    para2: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    HPId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "healthprofessional",
      required: true,
    },
    img: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);
const BlogModel = mongoose.model("Blog", blogSchema);

module.exports = { BlogModel };
