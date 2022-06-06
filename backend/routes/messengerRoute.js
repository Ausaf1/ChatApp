const router = require("express").Router();
const {
  getFriends,
  messageUploadaDB,
  messageGet,
  ImageMessageSend,
} = require("../controller/messengerController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/get-friends", authMiddleware, getFriends);
router.post("/send-message", authMiddleware, messageUploadaDB);
router.get("/get-message/:id", authMiddleware, messageGet);
router.post("/image-message-send", authMiddleware, ImageMessageSend);

module.exports = router;
