import { UPDATE_INFO } from "./actions";

const initState = {
  info: null,
};

export const shopInfo = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_INFO:
      return { ...state, info: action.payload };
    default:
      return state;
  }
};
