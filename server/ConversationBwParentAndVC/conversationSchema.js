const mongoose = require("mongoose");
const { Schema } = mongoose;

const objectId = mongoose.Types.Schema.ObjectId;
const conversationBWParentAndVCSchema = Schema({
  parentId: {
    type: objectId,
    ref: "Parent",
    required: true,
  },
  vcId: {
    type: objectId,
    ref: "VC",
    required: true,
  },
  messages: [{ type: objectId, ref: "MessageBwParentAndVC" }],
  lastUpdated: { type: Date, default: Date.now },
});
const ConversationBWParentAndVCModel = mongoose.model(
  "ConversationBWParentAndVC",
  conversationBWParentAndVCSchema
);

module.exports = { ConversationBWParentAndVCModel };
