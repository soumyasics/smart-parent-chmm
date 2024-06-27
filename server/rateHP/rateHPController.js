const { HPModel } = require("../HealthProfessionals/hpSchema");
const { ParentModel } = require("../Parent/parentSchema");
const { RateHPModel } = require("./rateHpSchema");
const mongoose = require("mongoose");

const addRating = async (req, res) => {
  try {
    const { parentId, healthProfessionalId, rating, review } = req.body;
    if (!parentId || !healthProfessionalId || !rating || !review) {
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

    let currentRating = hp?.rating || 0;
    let newRating = (currentRating + rating) / 2;

    hp.rating = newRating;

    const rateHP = new RateHPModel({
      parentId,
      healthProfessionalId,
      rating,
      review,
    });

    await hp.save();
    await rateHP.save();
    return res
      .status(200)
      .json({ message: "Rating added successfully", success: true, currentRating: newRating });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllRating = async (req, res) => {
  try {
    const rating = await RateHPModel.find()
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

module.exports = { addRating, getAllRating };
