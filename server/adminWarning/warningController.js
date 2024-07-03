const mongoose = require("mongoose");
const { HPModel } = require("../HealthProfessionals/hpSchema");
const { WarningModel } = require("./WarningSchema");

const sendWarning = async (req, res) => {
  try {
    const { HPId, warningMsg } = req.body;
    if (!HPId || !warningMsg) {
      return res
        .status(400)
        .json({ message: "Please provide HPId and warningMsg" });
    }

    if (!mongoose.Types.ObjectId.isValid(HPId)) {
      return res.status(400).json({ message: "Invalid HPId" });
    }

    const hp = await HPModel.findById(HPId);
    if (!hp) {
      return res.status(404).json({ message: "Health professional not found" });
    }
    const warning = new WarningModel({ HPId, warningMsg });
    await warning.save();

    return res.status(200).json({ message: "Warning sent successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllWarningByHPId = async (req, res) => {
  try {
    const { id: HPId } = req.params;
    if (!HPId) {
      return res
        .status(400)
        .json({ message: "Please provide HPId and warningMsg" });
    }
    if (!mongoose.Types.ObjectId.isValid(HPId)) {
      return res.status(400).json({ message: "Invalid HPId" });
    }

    const warning = await WarningModel.find({ HPId });
    if (!warning) {
      return res.status(404).json({ message: "Warning not found" });
    }
    return res.status(200).json({ message: "All warning", data: warning });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { sendWarning, getAllWarningByHPId };
