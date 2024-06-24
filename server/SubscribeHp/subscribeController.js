const { SubscribeModel } = require("./subscribeSchema");
const mongoose = require("mongoose");
const { ParentModel } = require("../Parent/parentSchema");
const { HPModel } = require("../HealthProfessionals/hpSchema");
const newSubscription = async (req, res) => {
  try {
    const {
      parentId,
      healthProfessionalId,
      isActive,
      cardHolderName,
      cardNumber,
      cardExpiry,
      cardCVV,
      subscriptionAmount,
    } = req.body;

    if (
      !parentId ||
      !healthProfessionalId ||
      !cardHolderName ||
      !cardNumber ||
      !cardExpiry ||
      !cardCVV ||
      !subscriptionAmount
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!mongoose.Types.ObjectId.isValid(parentId)) {
      return res.status(400).json({ message: "Invalid parentId" });
    }

    if (!mongoose.Types.ObjectId.isValid(healthProfessionalId)) {
      return res.status(400).json({ message: "Invalid healthProfessionalId" });
    }

    const parent = await ParentModel.findById(parentId);
    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }

    const hp = await HPModel.findById(healthProfessionalId);
    if (!hp) {
      return res.status(404).json({ message: "Health Professional not found" });
    }

    const existingSubscription = await SubscribeModel.findOne({
      parentId,
      healthProfessionalId,
    });

    if (existingSubscription) {
      return res.status(409).json({ message: "You alredy subscribed." });
    }

    const newSubscription = new SubscribeModel({
      parentId,
      healthProfessionalId,
      isActive,
      cardHolderName,
      cardNumber,
      cardExpiry,
      cardCVV,
      subscriptionAmount,
    });

    parent.subscribedHPs.push(healthProfessionalId);
    hp.subscribers.push(parentId);

    await hp.save();
    await parent.save();
    await newSubscription.save();
    return res
      .status(201)
      .json({ message: "Subscribed", data: newSubscription });
  } catch (error) {
    console.error("Error in  subscribe: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getAllSubscriptionByParentId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid parentId" });
    }
    const subscriptions = await SubscribeModel.find({ parentId: id });
    return res
      .status(200)
      .json({ message: "Subscriptions", data: subscriptions });
  } catch (error) {
    console.error("Error in getAllSubscriptionByParentId: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

const getAllSubscriptionByHPId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid healthProfessionalId" });
    }
    const subscriptions = await SubscribeModel.find({
      healthProfessionalId: id,
    });
    return res
      .status(200)
      .json({ message: "Subscriptions", data: subscriptions });
  } catch (error) {
    console.error("Error in getAllSubscriptionByHPId: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

const getAllSubscriptions = async (req, res) => {
  try {
    const allSubscriptions = await SubscribeModel.find()
      .populate("parentId")
      .populate("healthProfessionalId")
      .exec();
    return res.status(200).json({
      message: "All subscriptions",
      data: allSubscriptions,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
module.exports = {
  newSubscription,
  getAllSubscriptionByParentId,
  getAllSubscriptionByHPId,
  getAllSubscriptions,
};
