const Chat = require("../models/Chat");

// Send Message
const sendMessage = async (req, res) => {
  try {
    const { property, sender, receiver, message } = req.body;

    const newMessage = new Chat({
      property,
      sender,
      receiver,
      message,
    });

    await newMessage.save();

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Messages
const getChatMessages = async (req, res) => {
  try {
    const messages = await Chat.find({
      property: req.params.propertyId,
    })
      .populate("sender", "name email")
      .populate("receiver", "name email")
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Message
const deleteMessage = async (req, res) => {
  try {
    await Chat.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  sendMessage,
  getChatMessages,
  deleteMessage,
};