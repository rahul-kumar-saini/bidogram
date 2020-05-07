import {
  fetchCollectionPending,
  fetchCollectionSuccess,
  fetchCollectionError,
} from "../actions/collection";

import axios from "./api";
import * as apiURLS from "./apiURL";

export function fetchCollection() {
  return (dispatch) => {
    dispatch(fetchCollectionPending());
    axios
      .get(apiURLS.GET_COLLECTIONS, { withCredentials: true })
      .then((res) => {
        const collection = res.data;
        dispatch(fetchCollectionSuccess(collection));
      })
      .catch((error) => {
        dispatch(fetchCollectionError(error));
      });
  };
}
