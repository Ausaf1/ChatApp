import React from "react";
import { BiMessageAltEdit } from "react-icons/bi";
import { BsPlusCircle } from "react-icons/bs";
import { RiGalleryLine } from "react-icons/ri";
import { AiFillGift } from "react-icons/ai";

const MessageSend = ({
  inputHandle,
  newMessage,
  sendMessage,
  emojiSend,
  ImageSend,
}) => {
  const emojis = [
    "😀",
    "😄",
    "😁",
    "😆",
    "😂",
    "🤣",
    "😊",
    "🙂",
    "🙃",
    "😉",
    "😍",
    "😝",
    "😜",
    "🧐",
    "🤓",
    "😎",
    "😕",
    "🤑",
    "🥴",
    "😱",
  ];
  return (
    <div className="message-send-section">
      <input type="checkbox" id="emoji" />
      <div className="file hover-attachment">
        <div className="add-attachment">Add attachment</div>
        <BsPlusCircle />
      </div>
      <div className="file hover-image">
        <div className="add-image">Add Image</div>
        <input
          onChange={ImageSend}
          type="file"
          id="pic"
          className="form-control"
        />
        <label htmlFor="pic">
          <RiGalleryLine />
        </label>
      </div>
      <div className="file">
        <BiMessageAltEdit />
      </div>
      <div className="file hover-gift">
        <div className="add-gift">Add Gift</div>
        <AiFillGift />
      </div>
      <div className="message-type">
        <input
          onChange={inputHandle}
          type="text"
          name="message"
          id="message"
          placeholder="Aa"
          value={newMessage}
          className="form-control"
        />
        <label htmlFor="emoji">🙂</label>
      </div>
      <div onClick={sendMessage} className="file">
        ❤️
      </div>
      <div className="emoji-section">
        <div className="emoji">
          {emojis.map((emoji, index) => {
            return (
              <span onClick={() => emojiSend(emoji)} key={index}>
                {emoji}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MessageSend;
