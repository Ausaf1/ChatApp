import React from "react";
import { BsCameraVideoFill } from "react-icons/bs";
import { IoMdCall } from "react-icons/io";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import Message from "./Message";
import MessageSend from "./MessageSend";
import FriendInfo from "./FriendInfo";

const RightSide = (props) => {
  const {
    currentFriend,
    inputHandle,
    newMessage,
    sendMessage,
    message,
    scrollRef,
    emojiSend,
    ImageSend,
  } = props;
  // console.log(currentFriend);
  return (
    <div className="col-9">
      <div className="right-side">
        <input type="checkbox" id="dot" />
        <div className="row">
          <div className="col-8">
            <div className="message-send-show">
              <div className="header">
                <div className="image-name">
                  <div className="image">
                    <img src={`./image/${currentFriend.image}`} alt="" />
                    <div className="active-icon"></div>
                  </div>
                  <div className="name">
                    <h3>{currentFriend.userName}</h3>
                  </div>
                </div>
                <div className="icons">
                  <div className="icon">
                    <IoMdCall />
                  </div>
                  <div className="icon">
                    <BsCameraVideoFill />
                  </div>
                  <div className="icon">
                    <label htmlFor="dot">
                      <HiDotsCircleHorizontal />
                    </label>
                  </div>
                </div>
              </div>
              <Message
                currentFriend={currentFriend}
                scrollRef={scrollRef}
                message={message}
              />
              <MessageSend
                ImageSend={ImageSend}
                emojiSend={emojiSend}
                sendMessage={sendMessage}
                inputHandle={inputHandle}
                newMessage={newMessage}
              />
            </div>
          </div>
          <div className="col-4">
            <FriendInfo currentFriend={currentFriend} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
