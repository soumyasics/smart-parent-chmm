const { SubscribeModel } = require("./subscribeSchema");
const mongoose = require("mongoose");
const { ParentModel } = require("../Parent/parentSchema");
const { HPModel } = require("../HealthProfessionals/hpSchema");

const appointmentReq = async (req, res) => {
  try {
    const { parentId, healthProfessionalId, subscriptionAmount, date } =
      req.body;

    if (!parentId || !healthProfessionalId || !subscriptionAmount || !date) {
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

    const isAlreadyBookedAppointment = await SubscribeModel.findOne({
      parentId,
      healthProfessionalId,
      date,
    });
    if (isAlreadyBookedAppointment) {
      return res
        .status(400)
        .json({ message: "Appointment already booked for this date" });
    }
    const appointmentReq = new SubscribeModel({
      parentId,
      healthProfessionalId,
      subscriptionAmount,
      date,
    });

    parent.subscribedHPs.push(healthProfessionalId);
    hp.subscribers.push(parentId);

    await appointmentReq.save();
    await hp.save();
    await parent.save();
    return res
      .status(201)
      .json({ message: "Appointment request created", data: appointmentReq });
  } catch (error) {
    console.error("Error in  appointment req: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const rejectAppointment = async (req, res) => {
  try {
    const id = req.params.id;
    const { reasonForRejection } = req.body;
    if (!reasonForRejection) {
      return res
        .status(404)
        .json({ message: "Reason for rejection is required." });
    }
    const subscribe = await SubscribeModel.findById(id);
    if (!subscribe) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const update = await SubscribeModel.findByIdAndUpdate(
      id,
      {
        reasonForRejection,
        appointmentStatus: "rejected",
        paymentStatus: "cancelled",
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Appointment rejected", data: update });
  } catch (error) {
    console.error("Error in  appointment req: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
const approvedAppointment = async (req, res) => {
  try {
    const id = req.params.id;
    const subscribe = await SubscribeModel.findById(id);
    if (!subscribe) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const update = await SubscribeModel.findByIdAndUpdate(
      id,
      {
        appointmentStatus: "approved",
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Appointment approved", data: update });
  } catch (error) {
    console.error("Error in  appointment req: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const payAppointmentFee = async (req, res) => {
  try {
    const id = req.params.id;
    const subscribe = await SubscribeModel.findById(id);
    if (!subscribe) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const { cardHolderName, cardNumber, cardExpiry, cardCVV } = req.body;

    const update = await SubscribeModel.findByIdAndUpdate(
      id,
      {
        cardHolderName,
        cardNumber,
        cardExpiry,
        cardCVV,
        paymentStatus: "completed",
      },
      { new: true }
    );
    return res.status(200).json({ message: "Payment completed", data: update });
  } catch (error) {
    console.error("Error in  appointment req: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

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
      date,
    } = req.body;

    if (
      !parentId ||
      !healthProfessionalId ||
      !cardHolderName ||
      !cardNumber ||
      !cardExpiry ||
      !cardCVV ||
      !subscriptionAmount ||
      !date
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

    // todo check if already subscribed (appointment taken)
    const existingSubscription = await SubscribeModel.findOne({
      parentId,
      healthProfessionalId,
    });

    // if (existingSubscription) {
    //   return res.status(409).json({ message: "You alredy subscribed." });
    // }

    const newSubscription = new SubscribeModel({
      parentId,
      healthProfessionalId,
      isActive,
      cardHolderName,
      cardNumber,
      cardExpiry,
      date,
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
const fitnessSubscription = async (req, res) => {
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
      date,
    } = req.body;

    if (
      !parentId ||
      !healthProfessionalId ||
      !cardHolderName ||
      !cardNumber ||
      !cardExpiry ||
      !cardCVV ||
      !subscriptionAmount ||
      !date
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

    // todo check if already subscribed (appointment taken)
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
      date,
      cardCVV,
      type: "subscription",
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
    const subscriptions = await SubscribeModel.find({ parentId: id })
      .populate("healthProfessionalId")
      .exec();

    const allHPs = subscriptions.map(
      (subscription) => subscription.healthProfessionalId
    );
    // Use a Set to remove duplicates
    const uniqueHPs = Array.from(
      new Set(allHPs.map((hp) => hp._id.toString()))
    ).map((id) => allHPs.find((hp) => hp._id.toString() === id));

    return res.status(200).json({ message: "Subscriptions", data: uniqueHPs });
  } catch (error) {
    console.error("Error in getAllSubscriptionByParentId: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};
const getAllSubscriptionByParentId2 = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid parentId" });
    }
    const subscriptions = await SubscribeModel.find({ parentId: id })
      .populate("healthProfessionalId")
      .exec();

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
    })
      .populate("parentId")
      .exec();
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

const getSubscriptionStatus = async (req, res) => {
  try {
    const { parentId, healthProfessionalId } = req.body;

    if (!parentId || !healthProfessionalId) {
      return res.status(400).json({ message: "Parent id and HP id required." });
    }
    if (!mongoose.Types.ObjectId.isValid(parentId)) {
      return res.status(400).json({ message: "Invalid parentId" });
    }

    if (!mongoose.Types.ObjectId.isValid(healthProfessionalId)) {
      return res.status(400).json({ message: "Invalid healthProfessionalId" });
    }

    const isSubscribed = await SubscribeModel.find({
      parentId,
      healthProfessionalId,
    });

    if (isSubscribed.length > 0) {
      return res.status(200).json({
        suscriptionStatus: true,
        message: "Subscribed",
        appointmentDate:
          isSubscribed[isSubscribed.length - 1].date ||
          "2024-01-01T11:49:00.000Z",
      });
    } else {
      return res
        .status(200)
        .json({ suscriptionStatus: false, message: "Not subscribed" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  newSubscription,
  getAllSubscriptionByParentId,
  getAllSubscriptionByParentId2,
  getAllSubscriptionByHPId,
  getSubscriptionStatus,
  getAllSubscriptions,
  fitnessSubscription,
  appointmentReq,
  rejectAppointment,
  approvedAppointment,
  payAppointmentFee,
};
