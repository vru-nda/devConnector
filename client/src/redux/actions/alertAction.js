import {v4 as uuidv4} from "uuid";

import {REMOVE_ALERT, SET_ALERT} from "./types";

export const setAlert =
  (message, alertType, timout = 3000) =>
  (dispatch) => {
    const id = uuidv4();

    dispatch({
      type: SET_ALERT,
      payload: {message, alertType, id},
    });

    setTimeout(() => {
      dispatch({type: REMOVE_ALERT, payload: id});
    }, timout);
  };

export const removeAlert = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_ALERT,
    payload: id,
  });
};
