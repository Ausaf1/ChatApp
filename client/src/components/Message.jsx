import React from "react";

const Message = () => {
  return (
    <div className="message-show">
      <div className="my-message">
        <div className="image-message">
          <div className="my-text">
            <p className="message-text my">How are u?</p>
          </div>
        </div>
        <div className="time">5 June,2022</div>
      </div>
      <div className="fd-message">
        <div className="image-message-time">
          <img src="/image/92671cvpic.jpeg" alt="" />
          <div className="message-time">
            <div className="fd-text">
              <p className="message-text fd">Hi,I'm fine</p>
            </div>
            <div className="time">5 June 2022</div>
          </div>
        </div>
      </div>
      <div className="my-message">
        <div className="image-message">
          <div className="my-text">
            <p className="message-text my">
              {" "}
              <img src="/image/92671cvpic.jpeg" alt="" />
            </p>
          </div>
        </div>
        <div className="time">5 June,2022</div>
      </div>
    </div>
  );
};

export default Message;
