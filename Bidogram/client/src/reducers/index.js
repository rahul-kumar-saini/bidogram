import { combineReducers } from "redux";
import { user } from "./user";
import { collection } from "./collection";
import { game } from "./game";

export const rootReducer = combineReducers({
  user,
  collection,
  game,
});
