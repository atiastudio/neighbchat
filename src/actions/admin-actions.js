export const clientsRequested = () => {
  return {
    type: 'FETCH_CLIENTS_START',
  };
};

export const updateClient = (payload) => {
  return {
    type: 'UPDATE_CLIENT',
    payload,
  };
};
