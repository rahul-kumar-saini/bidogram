import {
  FETCH_GAME_PENDING,
  FETCH_GAME_SUCCESS,
  FETCH_GAME_ERROR,
} from "../actions/games";

const initialState = {
  pending: false,
  game: [],
  error: null,
};

export function game(state = initialState, action) {
  switch (action.type) {
    case FETCH_GAME_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_GAME_SUCCESS:
      return {
        ...state,
        pending: false,
        game: action.game,
      };
    case FETCH_GAME_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export const getGame = (state) => state.game.game;
export const getGamePending = (state) => state.game.pending;
export const getGameError = (state) => state.game.error;
