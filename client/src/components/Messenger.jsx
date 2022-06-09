import React, { useEffect, useState, useRef } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import "../sass/components/_messenger.scss";
import ActiveFriend from "./ActiveFriend";
import Friends from "./Friends";
import RightSide from "./RightSide";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  getFriends,
  messageSend,
  getMessage,
  ImageMessageSend,
} from "../store/actions/messengerAction";

const Messenger = () => {
  const { myInfo } = useSelector((state) => state.auth);
  const { friends, message } = useSelector((state) => state.messenger || {});
  const socket = useRef();
  const scrollRef = useRef();
  const [currentFriend, setCurrentFriend] = useState("");
  // console.log(currentFriend);
  const [newMessage, setNewMessage] = useState("");
  const [socketMessage, setSecketMessage] = useState("");
  const [typingMessage, setTypingMessage] = useState("");
  const dispatch = useDispatch();
  // console.log(socket);
  useEffect(() => {
    socket.current = io(`ws://localhost:8000`);
    socket.current.on("getMessage", (data) => {
      setSecketMessage(data);
    });
    socket.current.on("typingMessageGet", (data) => {
      setTypingMessage(data);
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", myInfo.id, myInfo);
  }, [myInfo, myInfo.id]);

  useEffect(() => {
    socket.current.on("getUser", (users) => {
      const filterUser = users.filter((user) => user.userId !== myInfo.id);
      setActiveUser(filterUser);
    });
  }, [myInfo.id]);

  useEffect(() => {
    if (socketMessage && currentFriend) {
      if (
        socketMessage.senderId === currentFriend._id &&
        socketMessage.recieverId === myInfo.id
      ) {
        dispatch({
          type: "SOCKET_MESSAGE",
          pyload: {
            message: socketMessage,
          },
        });
      }
    }
    setSecketMessage("");
  }, [currentFriend, dispatch, myInfo.id, socketMessage]);

  const [activeUser, setActiveUser] = useState("");
  const inputHandle = (e) => {
    setNewMessage(e.target.value);
    socket.current.emit("typingMessage", {
      senderId: myInfo.id,
      recieverId: currentFriend._id,
      msg: e.target.value,
    });
  };
  // console.log(newMessage);
  const sendMessage = (e) => {
    e.preventDefault();
    const data = {
      senderName: myInfo.userName,
      recieverId: currentFriend._id,
      message: newMessage ? newMessage : "❤️",
    };
    socket.current.emit("sendMessage", {
      senderId: myInfo.id,
      senderName: myInfo.userName,
      recieverId: currentFriend._id,
      time: new Date(),
      message: {
        text: newMessage ? newMessage : "❤️",
        image: "",
      },
    });
    socket.current.emit("typingMessage", {
      senderId: myInfo.id,
      recieverId: currentFriend._id,
      msg: "",
    });
    dispatch(messageSend(data));
    setNewMessage("");
  };
  const emojiSend = (e) => {
    setNewMessage(newMessage + e);
  };
  const ImageSend = (e) => {
    if (e.target.files.length !== 0) {
      const imageName = e.target.files[0].name;
      const newImageName = Date.now() + imageName;
      socket.current.emit("sendMessage", {
        senderId: myInfo.id,
        senderName: myInfo.userName,
        recieverId: currentFriend._id,
        time: new Date(),
        message: {
          text: "",
          image: newImageName,
        },
      });
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
              {activeUser && activeUser.length > 0
                ? activeUser.map((u) => (
                    <ActiveFriend
                      setCurrentFriend={setCurrentFriend}
                      user={u}
                    />
                  ))
                : ""}
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
            activeUser={activeUser}
            ImageSend={ImageSend}
            currentFriend={currentFriend}
            inputHandle={inputHandle}
            newMessage={newMessage}
            sendMessage={sendMessage}
            message={message}
            scrollRef={scrollRef}
            emojiSend={emojiSend}
            typingMessage={typingMessage}
          />
        ) : (
          "Please select a friend"
        )}
      </div>
    </div>
  );
};

export default Messenger;
