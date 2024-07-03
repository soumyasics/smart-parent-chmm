const mongoose = require("mongoose");
const warningSchema = new mongoose.Schema(
  {
    HPId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "healthprofessional",
      required: true,
    },
    warningMsg: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const WarningModel = mongoose.model("AdminWarning", warningSchema);
module.exports = { WarningModel };
