const mongoose = require("mongoose");
const ComplaintHPSchema = new mongoose.Schema(
  {
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
      required: true,
    },
    healthProfessionalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "healthprofessional",
      required: true,
    },

    complaint: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ComplaintHPModel = mongoose.model("ComplaintHP", ComplaintHPSchema);
module.exports = { ComplaintHPModel };
