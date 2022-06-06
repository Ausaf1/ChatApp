import axios from "axios";
import {
  FRIENDS_GET_SUCCESS,
  MESSAGE_GET_SUCCESS,
  MESSAGE_SEND_SUCCESS,
  IMAGE_MESSAGE_SEND,
} from "../types/messengerType";

export const getFriends = () => async (dispatch, getState) => {
  try {
    const response = await axios.get("/api/messenger/get-friends");
    dispatch({
      type: FRIENDS_GET_SUCCESS,
      payload: {
        friends: response.data.friends,
      },
    });
  } catch (err) {
    console.log(err.response.data);
  }
};

export const messageSend = (data) => async (dispatch, getState) => {
  try {
    const response = await axios.post("/api/messenger/send-message", data);
    dispatch({
      type: MESSAGE_SEND_SUCCESS,
      payload: {
        message: response.data.message,
      },
    });
  } catch (err) {
    console.log(err.response.data);
  }
};

export const getMessage = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/messenger/get-message/${id}`);
      dispatch({
        type: MESSAGE_GET_SUCCESS,
        payload: {
          message: response.data.message,
        },
      });
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const ImageMessageSend = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      "/api/messenger/image-message-send",
      data
    );
    dispatch({
      type: IMAGE_MESSAGE_SEND,
      payload: {
        message: response.data.message,
      },
    });
  } catch (err) {
    console.log(err.response.data);
  }
};
