const { isValidObjectId } = require("mongoose");
const {
  ConversationBWParentAndVCModel,
} = require("../ConversationBwParentAndVC/conversationSchema");
const { MessageBwParentAndVCModel } = require("./messageSchema");

const sendMessageParentAndVC = async (req, res) => {
  try {
    const { message, parentId, VCId, senderType, receiverType } = req.body;
    if (!message || !parentId || !VCId || !senderType || !receiverType) {
      return res
        .status(400)
        .json({ message: "All fields are required", error: error.message });
    }

    if (!isValidObjectId(parentId) || !isValidObjectId(VCId)) {
      return res
        .status(400)
        .json({ message: "Invalid ObjectId", error: error.message });
    }

    if (
      !["parent", "vc"].includes(senderType) ||
      !["parent", "vc"].includes(receiverType)
    ) {
      return res.status(400).json({
        message: "Invalid senderType or receiverType",
        error: error.message,
      });
    }

    let conversation = await ConversationBWParentAndVCModel.findOne({
      parentId,
      VCId,
    });

    if (!conversation) {
      conversation = await ConversationBWParentAndVCModel.create({
        parentId,
        VCId,
      });
    }

    const newMessage = new MessageBwParentAndVCModel({
      converstationId: conversation._id,
      senderType,
      parentId,
      receiverType,
      VCId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // todo: add socket here
    await Promise.all([newMessage.save(), conversation.save()]);

    return res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error on send message", error: error.message });
  }
};

const getSingleConversation = async (req, res) => {
  try {
    const { parentId, VCId } = req.body;
    if (!parentId || !VCId) {
      return res
        .status(400)
        .json({ message: "All fields are required", error: error.message });
    }
    if (!isValidObjectId(parentId) || !isValidObjectId(VCId)) {
      return res
        .status(400)
        .json({ message: "Invalid ObjectId", error: error.message });
    }
    const conversation = await ConversationBWParentAndVCModel.findOne({
      parentId,
      VCId,
    }).populate("messages")
      .populate("parentId")
      .populate("VCId")
      .exec();


    // if (!conversation) {
    //   return res
    //     .status(404)
    //     .json({ message: "Conversation not found", error: error.message });
    // }

    const messages = conversation?.messages || [];
    return res
      .status(200)
      .json({ message: "Conversation found", data: messages });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error on get conversation", error });
  }
};

module.exports = { sendMessageParentAndVC, getSingleConversation };
