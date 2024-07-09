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

    const rateHP = new RateHPModel({
      parentId,
      healthProfessionalId,
      rating,
      review,
    });
    await rateHP.save();

    const prevRatings = await RateHPModel.find({ healthProfessionalId });
    let newRating = 0;
   
    if (prevRatings.length > 0) {
      const totalRates = prevRatings.reduce((acc, curr) => {
        return acc + curr.rating;
      }, 0);
      newRating = totalRates / prevRatings.length;
    }

    hp.rating = newRating;

    await hp.save();
    return res.status(200).json({
      message: "Rating added successfully",
      success: true,
      currentRating: newRating,
    });
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

const getAllRatingByHPId = async (req, res) => {
  try {
    const { id } = req.params;
    const rating = await RateHPModel.find({ healthProfessionalId: id })
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

module.exports = { addRating, getAllRating, getAllRatingByHPId };
