export const UPDATE_INFO = "UPDATE_INFO";

export const updateInfo = (dispatch, info) => {
  dispatch({ type: UPDATE_INFO, payload: info });
};
