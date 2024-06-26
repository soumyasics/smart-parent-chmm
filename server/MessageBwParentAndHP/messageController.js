const { isValidObjectId } = require("mongoose");
const {
  ConversationBWParentAndHPModel,
} = require("../ConversationBwParentAndHP/conversationSchema");
const { MessageBwParentAndHPModel } = require("./messageSchema");

const sendMessageParentAndHP = async (req, res) => {
  try {
    const { message, parentId, HPId, senderType, receiverType } = req.body;
    if (!message || !parentId || !HPId || !senderType || !receiverType) {
      return res
        .status(400)
        .json({ message: "All fields are required", error: error.message });
    }

    if (!isValidObjectId(parentId) || !isValidObjectId(HPId)) {
      return res
        .status(400)
        .json({ message: "Invalid ObjectId", error: error.message });
    }

    if (
      !["parent", "hp"].includes(senderType) ||
      !["parent", "hp"].includes(receiverType)
    ) {
      return res.status(400).json({
        message: "Invalid senderType or receiverType",
        error: error.message,
      });
    }

    let conversation = await ConversationBWParentAndHPModel.findOne({
      parentId,
      HPId,
    });

    if (!conversation) {
      conversation = await ConversationBWParentAndHPModel.create({
        parentId,
        HPId,
      });
    }

    const newMessage = new MessageBwParentAndHPModel({
      converstationId: conversation._id,
      senderType,
      parentId,
      receiverType,
      HPId,
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
    const { parentId, HPId } = req.body;
    if (!parentId || !HPId) {
      return res
        .status(400)
        .json({ message: "All fields are required", error: error.message });
    }
    if (!isValidObjectId(parentId) || !isValidObjectId(HPId)) {
      return res
        .status(400)
        .json({ message: "Invalid ObjectId", error: error.message });
    }

    const checkConversationExist = await ConversationBWParentAndHPModel.findOne(
      {
        parentId,
        HPId,
      }
    );
    let conversation = null;

    if (checkConversationExist) {
      conversation = await ConversationBWParentAndHPModel.findOne({
        parentId,
        HPId,
      })
        .populate("messages")
        .populate("parentId")
        .populate("HPId")
        .exec();
    }

    return res
      .status(200)
      .json({ message: "Conversation found", data: conversation });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error on get conversation", error: error.message });
  }
};

module.exports = { sendMessageParentAndHP, getSingleConversation };
