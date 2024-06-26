const mongoose = require("mongoose");
const { Schema } = mongoose;

const objectId = mongoose.Schema.Types.ObjectId;
const conversationBWParentAndHPSchema = Schema({
  parentId: {
    type: objectId,
    ref: "Parent",
    required: true,
  },
  HPId: {
    type: objectId,
    ref: "healthprofessional",
    required: true,
  },
  messages: [{ type: objectId, ref: "MessageBwParentAndHP" }],
  lastUpdated: { type: Date, default: Date.now },
});
const ConversationBWParentAndHPModel = mongoose.model(
  "ConversationBWParentAndHP",
  conversationBWParentAndHPSchema
);

module.exports = { ConversationBWParentAndHPModel };
