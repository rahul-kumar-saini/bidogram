import {
  FETCH_USER_PENDING,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
} from "../actions/user";

const initialState = {
  pending: false,
  user: null,
  error: null,
};

export function user(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        user: action.user,
      };
    case FETCH_USER_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export const getUser = (state) => state.user.user;
export const getUserPending = (state) => state.user.pending;
export const getUserError = (state) => state.user.error;
