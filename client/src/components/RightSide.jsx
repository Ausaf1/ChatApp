import React from "react";
import { BsCameraVideoFill } from "react-icons/bs";
import { IoMdCall } from "react-icons/io";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import Message from "./Message";
import MessageSend from "./MessageSend";
import FriendInfo from "./FriendInfo";

const RightSide = () => {
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
                    <img src="/image/92671cvpic.jpeg" alt="" />
                    <div className="active-icon"></div>
                  </div>
                  <div className="name">
                    <h3>Ausaf Ahmad</h3>
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
              <Message />
              <MessageSend />
            </div>
          </div>
          <div className="col-4">
            <FriendInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSide;