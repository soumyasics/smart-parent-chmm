const mongoose = require("mongoose");
const { Schema } = mongoose;
const messageBwParentAndHPSchema = Schema(
  {
    converstationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ConversationBWParentAndHP",
      required: true,
    },
    senderType: {
      type: String,
      enum: ["parent", "hp"],
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
      required: true,
    },
    receiverType: {
      type: String,
      enum: ["parent", "hp"],
      required: true,
    },
    HPId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "healthprofessional",
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

const MessageBwParentAndHPModel = mongoose.model(
  "MessageBwParentAndHP",
  messageBwParentAndHPSchema
);
module.exports = { MessageBwParentAndHPModel };
