export const FETCH_GAME_PENDING = "FETCH_GAME_PENDING";
export const FETCH_GAME_SUCCESS = "FETCH_GAME_SUCCESS";
export const FETCH_GAME_ERROR = "FETCH_GAME_ERROR";

export function fetchGamePending() {
  return {
    type: FETCH_GAME_PENDING,
  };
}

export function fetchGameSuccess(collection) {
  return {
    type: FETCH_GAME_SUCCESS,
    collection: collection,
  };
}

export function fetchGameError(error) {
  return {
    type: FETCH_GAME_ERROR,
    error: error,
  };
}
