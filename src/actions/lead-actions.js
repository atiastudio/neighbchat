export const leadsRequested = () => {
  return {
    type: 'FETCH_REQUESTS',
  };
};

export const sendRequest = (payload) => {
  return {
    type: 'SEND_REQUEST',
    payload,
  };
};

export const updateRequest = (payload) => {
  return {
    type: 'UPDATE_REQUEST',
    payload,
  };
};
