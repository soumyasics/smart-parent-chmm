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
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
    },
    cardExpiry: {
      type: String,
      required: true,
    },
    cardCVV: {
      type: String,
      required: true,
    },
    subscriptionAmount: {
      type: Number,
      required: true,
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
