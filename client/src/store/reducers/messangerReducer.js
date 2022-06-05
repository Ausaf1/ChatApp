import { FRIENDS_GET_SUCCESS } from "../types/messengerType";

const messengerState = {
  friends: [],
};

export const messangerReducer = (state = messengerState, action) => {
  const { type, payload } = action;

  if (type === FRIENDS_GET_SUCCESS) {
    return {
      ...state,
      friends: payload.friends,
    };
  }
  return state;
};
