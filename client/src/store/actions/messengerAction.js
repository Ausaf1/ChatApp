import axios from "axios";
import { FRIENDS_GET_SUCCESS } from "../types/messengerType";

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
