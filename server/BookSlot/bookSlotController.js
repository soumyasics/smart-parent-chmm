const { BookSlotModel } = require("./bookSlotSchema");
const { ParentModel } = require("../Parent/parentSchema");
const { VaccineModel } = require("../Vaccine/vaccineSchema");
const { VCModel } = require("../VaccinationCenters/vcSchema");
const mongoose = require("mongoose");

const bookSlot = async (req, res) => {
  try {
    const { vaccinationCenterId, parentId, vaccineId, bookingDate, kidId } =
      req.body;
    console.log("kidd id", kidId);
    if (!vaccinationCenterId || !parentId || !vaccineId || !bookingDate) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided.",
      });
    }

    if (
      !mongoose.isValidObjectId(vaccinationCenterId) ||
      !mongoose.isValidObjectId(parentId) ||
      !mongoose.isValidObjectId(vaccineId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid IDs.",
      });
    }

    const vc = await VCModel.findById(vaccinationCenterId);

    if (!vc) {
      return res.status(400).json({
        success: false,
        message: "Vaccination center not found.",
      });
    }

    const parent = await ParentModel.findById(parentId);
    if (!parent) {
      return res.status(400).json({
        success: false,
        message: "Parent not found.",
      });
    }

    const vaccine = await VaccineModel.findById(vaccineId);
    if (!vaccine) {
      return res.status(400).json({
        success: false,
        message: "Vaccine not found.",
      });
    }

    // check if slot is available
    if (!vaccine?.isBookingAvailable) {
      return res.status(400).json({
        success: false,
        message: "Slot booking is not available.",
      });
    }

    // check if parent has already booked slot
    let slot = await BookSlotModel.findOne({
      vaccinationCenterId,
      parentId,
      vaccineId,
    });

    
    if (slot) {
      return res.status(400).json({
        success: false,
        message: "You are already booked the slot.",
      });
    }

    // inc bookedSlots and add praent id to inside vaccine.bookedParents
    vaccine.bookedSlots += 1;
    vaccine.bookedParents.push(parentId);
    if (vaccine.bookedSlots >= vaccine.totalSlots) {
      vaccine.isBookingAvailable = false;
    }
    await vaccine.save();

    const newBookSlot = new BookSlotModel({
      vaccinationCenterId,
      parentId,
      vaccineId,
      bookingDate,
      kidId,
    });

    console.log("new book slot", newBookSlot)
    await newBookSlot.save();

    return res.status(200).json({
      success: true,
      message: "Slot booked successfully.",
      data: newBookSlot,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const getBookedSlotsByParent = async (req, res) => {
  try {
    const { id: parentId } = req.params;
    if (!parentId) {
      return res.status(400).json({
        success: false,
        message: "Parent id not provided.",
      });
    }
    if (!mongoose.isValidObjectId(parentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid parent id.",
      });
    }
    const parent = await ParentModel.findById(parentId);
    if (!parent) {
      return res.status(400).json({
        success: false,
        message: "Parent not found.",
      });
    }
    const slots = await BookSlotModel.find({ parentId })
      .populate("vaccineId")
      .populate("vaccinationCenterId")
      .exec();
    return res.status(200).json({
      success: true,
      data: slots,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBookedSlotByVaccineCenter = async (req, res) => {
  try {
    const { id: vaccinationCenterId } = req.params;
    if (!vaccinationCenterId) {
      return res.status(400).json({
        success: false,
        message: "Vaccination center id not provided.",
      });
    }
    const vc = await VaccineCenterModel.findById(vaccinationCenterId);
    if (!vc) {
      return res.status(400).json({
        success: false,
        message: "Vaccination center not found.",
      });
    }
    const slots = await BookSlotModel.find({ vaccinationCenterId })
      .populate("vaccineId")
      .exec();
    return res.status(200).json({
      success: true,
      data: slots,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBookedSlotByVaccineId = async (req, res) => {
  try {
    const { id: vaccineId } = req.params;
    if (!vaccineId) {
      return res.status(400).json({
        success: false,
        message: "Vaccine id not provided.",
      });
    }
    const slots = await BookSlotModel.find({ vaccineId });
    return res.status(200).json({
      success: true,
      data: slots,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  bookSlot,
  getBookedSlotsByParent,
  getBookedSlotByVaccineCenter,
  getBookedSlotByVaccineId,
};
