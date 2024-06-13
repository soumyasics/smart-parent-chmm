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
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "senderType",
      required: true,
    },
    receiverType: {
      type: String,
      enum: ["parent", "vc"],
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "receiverType",
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
