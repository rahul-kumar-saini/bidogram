import {
  FETCH_COLLECTION_PENDING,
  FETCH_COLLECTION_SUCCESS,
  FETCH_COLLECTION_ERROR,
} from "../actions/collection";

const initialState = {
  pending: false,
  collection: [],
  error: null,
};

export function collection(state = initialState, action) {
  switch (action.type) {
    case FETCH_COLLECTION_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_COLLECTION_SUCCESS:
      return {
        ...state,
        pending: false,
        collection: action.collection,
      };
    case FETCH_COLLECTION_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export const getCollection = (state) => state.collection.collection;
export const getCollectionPending = (state) => state.collection.pending;
export const getCollectionError = (state) => state.collection.error;
