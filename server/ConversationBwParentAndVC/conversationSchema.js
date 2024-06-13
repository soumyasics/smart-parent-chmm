const mongoose = require("mongoose");
const { Schema } = mongoose;

const objectId = mongoose.Schema.Types.ObjectId;
const conversationBWParentAndVCSchema = Schema({
  parentId: {
    type: objectId,
    ref: "Parent",
    required: true,
  },
  VCId: {
    type: objectId,
    ref: "VaccinationCenter",
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
