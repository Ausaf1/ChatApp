const User = require("../models/authModel");
const formidable = require("formidable");
const messageModel = require("../models/messageModel");
const fs = require("fs");

module.exports.getFriends = async (req, res) => {
  const myId = req.myId;
  // console.log(myId);
  try {
    const friendGet = await User.find({});
    const filter = friendGet.filter((friend) => friend.id !== myId);
    res.status(200).json({
      success: true,
      friends: filter,
    });
  } catch (err) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Server Error",
      },
    });
  }
};

module.exports.messageUploadaDB = async (req, res) => {
  const { senderName, recieverId, message } = req.body;
  const senderId = req.myId;
  console.log(senderId);
  try {
    const insertMessage = await messageModel.create({
      senderId: senderId,
      senderName: senderName,
      recieverId: recieverId,
      message: {
        text: message,
        image: "",
      },
    });
    res.status(201).json({
      success: true,
      message: {
        senderId: senderId,
        senderName: senderName,
        recieverId: recieverId,
        message: {
          text: message,
          image: "",
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Server Error",
      },
    });
  }
};

module.exports.messageGet = async (req, res) => {
  const myId = req.myId;
  const fdid = req.params.id;
  try {
    let getMessage = await messageModel.find({});

    getAllMessage = getMessage.filter(
      (message) =>
        (message.senderId === myId && message.recieverId === fdid) ||
        (message.senderId === fdid && message.recieverId === myId)
    );
    res.status(200).json({
      success: true,
      message: getAllMessage,
    });
  } catch (err) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Server Error",
      },
    });
  }
};

module.exports.ImageMessageSend = (req, res) => {
  const senderId = req.myId;
  const form = formidable();

  form.parse(req, (err, fields, files) => {
    const { senderName, recieverId, imageName } = fields;

    const newPath = __dirname + `../../../client/public/image/${imageName}`;

    files.image.name = imageName;

    try {
      fs.copyFile(files.image.filepath, newPath, async (err) => {
        if (err) {
          res.status(500).json({
            error: {
              errorMessage: "Image upload fail",
            },
          });
        } else {
          const insertMessage = await messageModel.create({
            senderId: senderId,
            senderName: senderName,
            recieverId: recieverId,
            message: {
              text: "",
              image: files.image.name,
            },
          });
          res.status(201).json({
            success: true,
            message: insertMessage,
          });
        }
      });
    } catch (error) {
      res.status(500).json({
        error: {
          errorMessage: "Internal server error",
        },
      });
    }
  });
};
