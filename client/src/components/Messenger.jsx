import React, { useEffect, useState, useRef } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import "../sass/components/_messenger.scss";
import ActiveFriend from "./ActiveFriend";
import Friends from "./Friends";
import RightSide from "./RightSide";
import { useDispatch, useSelector } from "react-redux";
import {
  getFriends,
  messageSend,
  getMessage,
  ImageMessageSend,
} from "../store/actions/messengerAction";

const Messenger = () => {
  const scrollRef = useRef();
  const { friends, message } = useSelector((state) => state.messenger || {});
  const { myInfo } = useSelector((state) => state.auth || {});

  const [currentFriend, setCurrentFriend] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const inputHandle = (e) => {
    setNewMessage(e.target.value);
  };
  // console.log(newMessage);
  const sendMessage = (e) => {
    e.preventDefault();
    const data = {
      senderName: myInfo.userName,
      recieverId: currentFriend._id,
      message: newMessage ? newMessage : "❤️",
    };
    dispatch(messageSend(data));
  };
  const dispatch = useDispatch();
  const emojiSend = (e) => {
    setNewMessage(newMessage + e);
  };
  const ImageSend = (e) => {
    if (e.target.files.length !== 0) {
      const imageName = e.target.files[0].name;
      const newImageName = Date.now() + imageName;
      const formData = new FormData();
      formData.append("senderName", myInfo.userName);
      formData.append("imageName", newImageName);
      formData.append("recieverId", currentFriend._id);
      formData.append("image", e.target.files[0]);
      dispatch(ImageMessageSend(formData));
    }
  };
  useEffect(() => {
    dispatch(getFriends());
  }, [dispatch]);
  useEffect(() => {
    if (friends && friends.length > 0) {
      setCurrentFriend(friends[0]);
    }
  }, [friends]);
  useEffect(() => {
    dispatch(getMessage(currentFriend._id));
  }, [currentFriend, dispatch]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div className="messenger">
      <div className="row">
        <div className="col-3">
          <div className="left-side">
            <div className="top">
              <div className="image-name">
                <div className="image">
                  <img src={`./image/${myInfo.image}`} alt="" />
                </div>
                <div className="name">
                  <h3>{myInfo.userName}</h3>
                </div>
              </div>
              <div className="icons">
                <div className="icon">
                  <BsThreeDots />
                </div>
                <div className="icon">
                  <FaEdit />
                </div>
              </div>
            </div>
            <div className="friend-search">
              <div className="search">
                <button>
                  <BiSearch />
                </button>
                <input
                  type="text"
                  placeholder="search"
                  className="form-control"
                />
              </div>
            </div>
            <div className="active-friends">
              <ActiveFriend />
            </div>
            <div className="friends">
              {friends && friends.length > 0
                ? friends.map((fd) => (
                    <div
                      onClick={() => setCurrentFriend(fd)}
                      className={
                        currentFriend._id === fd._id
                          ? "hover-friend active"
                          : "hover-friend"
                      }
                    >
                      <Friends friend={fd} />
                    </div>
                  ))
                : "no friends"}
            </div>
          </div>
        </div>
        {currentFriend ? (
          <RightSide
            ImageSend={ImageSend}
            currentFriend={currentFriend}
            inputHandle={inputHandle}
            newMessage={newMessage}
            sendMessage={sendMessage}
            message={message}
            scrollRef={scrollRef}
            emojiSend={emojiSend}
          />
        ) : (
          "Please select a friend"
        )}
      </div>
    </div>
  );
};

export default Messenger;
