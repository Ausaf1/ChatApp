const { model, Schema } = require("mongoose");

const messageSchema = new Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    recieverId: {
      type: String,
      required: true,
    },
    message: {
      text: {
        type: String,
      },
      image: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("message", messageSchema);
