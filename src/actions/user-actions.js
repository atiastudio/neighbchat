export const userRequested = (payload) => {
  return {
    type: 'FETCH_USER_START',
    payload,
  };
};

export const userUpdatePhoto = (payload) => {
  return {
    type: 'UPLOAD_PHOTO',
    payload,
  };
};

export const setLastReadMsg = (lastReadMsg) => {
  return {
    type: 'SET_LAST_READ_MESSAGE',
    payload: lastReadMsg,
  };
};
