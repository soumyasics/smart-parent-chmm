const mongoose = require("mongoose");
const { Schema } = mongoose;

const subscribeSchema = new Schema(
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
    date: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    cardHolderName: {
      type: String,
      default: ""
    },
    cardNumber: {
      type: String,
      default: ""
    },
    cardExpiry: {
      type: String,
      default: ""
    },
    cardCVV: {
      type: String,
      default: ""
    },
    subscriptionAmount: {
      type: Number,
      required: true,
    },
    appointmentStatus: {
      enum: ["pending", "approved", "rejected"],
      type: String,
      default: "pending",
    },
    reasonForRejection: {
      type: String,
      default: "",
    },
    paymentStatus: {
      enum: ["pending", "completed", "cancelled"],
      type: String,
      default: "pending",
    },
    type: {
      enum: ["appointment", "subscription"],
      type: String,
      default: "appointment",
    }
  },
  { timestamps: true }
);

const SubscribeModel = mongoose.model("subscribe", subscribeSchema);

module.exports = { SubscribeModel };
