export const FETCH_COLLECTION_PENDING = "FETCH_COLLECTION_PENDING";
export const FETCH_COLLECTION_SUCCESS = "FETCH_COLLECTION_SUCCESS";
export const FETCH_COLLECTION_ERROR = "FETCH_COLLECTION_ERROR";

export function fetchCollectionPending() {
  return {
    type: FETCH_COLLECTION_PENDING,
  };
}

export function fetchCollectionSuccess(collection) {
  return {
    type: FETCH_COLLECTION_SUCCESS,
    collection: collection,
  };
}

export function fetchCollectionError(error) {
  return {
    type: FETCH_COLLECTION_ERROR,
    error: error,
  };
}
