import {
  fetchGamePending,
  fetchGameSuccess,
  fetchGameError,
} from "../actions/games";

import axios from "./api";
import * as apiURLS from "./apiURL";

export function fetchGame() {
  return (dispatch) => {
    dispatch(fetchGamePending());
    axios
      .get(apiURLS.GET_GAMES, { withCredentials: true })
      .then((res) => {
        const game = res.data;
        dispatch(fetchGameSuccess(game));
      })
      .catch((error) => {
        dispatch(fetchGameError(error));
      });
  };
}
