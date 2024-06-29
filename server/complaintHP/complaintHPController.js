const { HPModel } = require("../HealthProfessionals/hpSchema");
const { ParentModel } = require("../Parent/parentSchema");
const { ComplaintHPModel } = require("./complaintHpSchema");
const mongoose = require("mongoose");

const addComplaint = async (req, res) => {
  try {
    const { parentId, healthProfessionalId, complaint } = req.body;
    if (!parentId || !healthProfessionalId || complaint) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (
      !mongoose.isValidObjectId(parentId) ||
      !mongoose.isValidObjectId(healthProfessionalId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid IDs.",
      });
    }

    const parent = await ParentModel.findById(parentId);
    if (!parent) {
      return res.status(400).json({
        success: false,
        message: "Parent not found.",
      });
    }
    const hp = await HPModel.findById(healthProfessionalId);
    if (!hp) {
      return res.status(400).json({
        success: false,
        message: "Health professional not found.",
      });
    }

    const complaintHP = new ComplaintHPModel({
      parentId,
      healthProfessionalId,
      complaint,
    });

    await complaintHP.save();
    return res
      .status(200)
      .json({ message: "Complaint added successfully", success: true });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllComplaints = async (req, res) => {
  try {
    const rating = await ComplaintHPModel.find()
      .populate("parentId")
      .populate("healthProfessionalId")
      .exec();
    return res.status(200).json({
      message: "Complaint fetched successfully",
      success: true,
      data: rating,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllComplaintsByHPId = async (req, res) => {
  try {
    const { id } = req.params;
    const rating = await ComplaintHPModel.find({ healthProfessionalId: id })
      .populate("parentId")
      .populate("healthProfessionalId")
      .exec();
    return res.status(200).json({
      message: "Rating fetched successfully",
      success: true,
      data: rating,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { addComplaint, getAllComplaints, getAllComplaintsByHPId };
