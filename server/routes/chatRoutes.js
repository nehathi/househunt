const express = require("express");

const {
  sendMessage,
  getChatMessages,
  deleteMessage,
} = require("../controllers/chatController");

const router = express.Router();

router.post("/", sendMessage);
router.get("/:propertyId", getChatMessages);
router.delete("/:id", deleteMessage);

module.exports = router;