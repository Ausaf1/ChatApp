import React from "react";
import { BsChevronBarDown } from "react-icons/bs";

const FriendInfo = () => {
  return (
    <div className="friend-info">
      <input type="checkbox" id="gallery" />
      <div className="image-name">
        <div className="image">
          <img src="./image/92671cvpic.jpeg" alt="" />
        </div>
        <div className="active-user">Active</div>
        <div className="name">
          <h4>Ausaf Ahmad</h4>
        </div>
      </div>
      <div className="others">
        <div className="custom-chat">
          <h3>Customize Chat</h3>
          <BsChevronBarDown />
        </div>
        <div className="privacy">
          <h3>Privacy and Support</h3>
          <BsChevronBarDown />
        </div>
        <div className="media">
          <h3>Shared Media</h3>
          <label htmlFor="gallery">
            <BsChevronBarDown />
          </label>
        </div>
      </div>
      <div className="gallery">
        <img src="./image/92671cvpic.jpeg" alt="" />
      </div>
    </div>
  );
};

export default FriendInfo;
