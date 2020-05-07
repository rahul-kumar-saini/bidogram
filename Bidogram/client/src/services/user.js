import {
  fetchUserPending,
  fetchUserSuccess,
  fetchUserError,
} from "../actions/user";

import axios from "./api";
import * as apiURLS from "./apiURL";

export function fetchUser() {
  return (dispatch) => {
    dispatch(fetchUserPending());
    axios
      .get(apiURLS.USERS, { withCredentials: true })
      .then((res) => {
        const user = res.data;
        dispatch(fetchUserSuccess(user));
      })
      .catch((error) => {
        dispatch(fetchUserError(error));
      });
  };
}
