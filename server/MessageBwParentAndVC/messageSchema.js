const mongoose = require("mongoose");
const { Schema } = mongoose;
const messageBwParentAndVCSchema = Schema(
  {
    converstationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ConversationBWParentAndVC",
      required: true,
    },
    senderType: {
      type: String,
      enum: ["parent", "vc"],
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
      required: true,
    },
    receiverType: {
      type: String,
      enum: ["parent", "vc"],
      required: true,
    },
    VCId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VaccinationCenter",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const MessageBwParentAndVCModel = mongoose.model(
  "MessageBwParentAndVC",
  messageBwParentAndVCSchema
);
module.exports = { MessageBwParentAndVCModel };
